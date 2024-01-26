/**
 * The contact dialog definition.
 *
 *
 */

/*
Places with linked addresses:


https://www.npeu.ox.ac.uk/ukoss/contact
https://www.npeu.ox.ac.uk/ukmidss/contact-details
https://www.npeu.ox.ac.uk/baps-cass/contact


*/
//(function() {
    CKEDITOR.dialog.add( 'contactDialog', function( editor ) {
        return {
            title: 'Contact Details',
            minWidth: 400,
            minHeight: 200,

            contact: {},

            contents: [
                {
                    id: 'tab-person',
                    label: 'Person',
                    elements: [
                        {
                            type: 'text',
                            id: 'contact_title',
                            label: 'Title (e.g. Dr, Prof)',
                            setup: function(contact_data) {
                                this.setValue(contact_data.contact_title);
                            }
                        },
                        {
                            type: 'text',
                            id: 'contact_name',
                            label: 'Name',
                            validate: CKEDITOR.dialog.validate.notEmpty("Contact name cannot be empty."),
                            setup: function(contact_data) {
                                this.setValue(contact_data.contact_name);
                            }
                        },
                        {
                            type: 'text',
                            id: 'contact_url',
                            label: 'URL',
                            setup: function(contact_data) {
                                this.setValue(contact_data.contact_url);
                            }
                        },
                        {
                            type: 'textarea',
                            id: 'contact_roles',
                            label: 'Roles / job titles (one per line)',
                            rows: 4,
                            setup: function(contact_data) {
                                this.setValue(contact_data.contact_roles);
                            }
                        }
                    ]
                },
                {
                    id: 'tab-address',
                    label: 'Address',
                    elements: [
                        {
                            type: 'textarea',
                            id: 'contact_street_address',
                            label: 'Address',
                            rows: 6,
                            setup: function(contact_data) {
                                this.setValue(contact_data.contact_street_address);
                            }
                        },
                        {
                            type: 'text',
                            id: 'contact_address_locality',
                            label: 'City',
                            setup: function(contact_data) {
                                this.setValue(contact_data.contact_address_locality);
                            }
                        },
                        {
                            type: 'text',
                            id: 'contact_postal_code',
                            label: 'Postcode',
                            setup: function(contact_data) {
                                this.setValue(contact_data.contact_postal_code);
                            }
                        }
                    ]
                },
                {
                    id: 'tab-details',
                    label: 'Email, Tel etc.',
                    elements: [
                        {
                            type: 'textarea',
                            id: 'contact_emails',
                            label: 'Email addresses (one per line)',
                            rows: 4,
                            setup: function(contact_data) {
                                this.setValue(contact_data.contact_emails);
                            }
                        },
                        {
                            type: 'textarea',
                            id: 'contact_tels',
                            label: 'Telephone numbers (one per line)',
                            rows: 4,
                            setup: function(contact_data) {
                                this.setValue(contact_data.contact_tels);
                            }
                        },
                        /*{
                            type: 'textarea',
                            id: 'contact_mobiles',
                            label: 'Mobile numbers (one per line)',
                            rows: 4,
                            setup: function(contact_data) {
                                this.setValue(contact_data.contact_mobiles);
                            }
                        },*/
                        {
                            type: 'textarea',
                            id: 'contact_faxes',
                            label: 'Fax numbers (one per line)',
                            rows: 4,
                            setup: function(contact_data) {
                                this.setValue(contact_data.contact_faxes);
                            }
                        },
                        {
                            type: 'textarea',
                            id: 'contact_twitters',
                            label: 'Twitter handles (one per line)',
                            rows: 4,
                            setup: function(contact_data) {
                                this.setValue(contact_data.contact_twitters);
                            }
                        }
                    ]
                }
            ],

            onShow: function() {
                // Reset the contact data:
                this.definition.contact = {};
                this.insertMode = true;

                var dialog       = this;
                var definition   = dialog.definition;
                var contact_data = definition.contact;



                var selection    = editor.getSelection();
                var element      = selection.getStartElement();

                console.log(element);

                if (element.getAttribute('data-cke-widget-wrapper') === '1') {
                    // Widget selected, look for a contact list:
                    var contact_list = element.find('dl[data-contains="contact-details"]').getItem(0);

                    console.log(contact_list);

                    if (contact_list) {
                        // We're in Edit mode:
                        this.insertMode = false;

                        // Attempt to construct the contact details:
                        // Person:
                        if (contact_title = contact_list.find('[itemprop="honorificPrefix"]').getItem(0)) {
                            contact_data.contact_title = contact_title.getText();
                        }

                        contact_data.contact_name  = contact_list.find('[itemprop="name"]').getItem(0).getText();

                        if (contact_url = contact_list.find('[itemprop="name"]').getItem(0).getAscendant('a')) {
                            contact_data.contact_url   = contact_url.getAttribute('href');
                        }

                        var contact_roles_list     = contact_list.find('[itemprop="jobTitle"]').toArray();
                        if (contact_roles_list) {
                            var contact_roles = '';
                            CKEDITOR.tools.array.forEach(contact_roles_list, function(value, index, array) {
                                contact_roles += value.getText() + "\n";
                            });
                            contact_data.contact_roles = contact_roles;
                        }

                        // Address:
                        if (contact_street_address = contact_list.find('[itemprop="streetAddress"]').getItem(0)) {
                            contact_data.contact_street_address = contact_street_address.getHtml().replace(/<br>/g, "\n");
                        }

                        if (contact_address_locality = contact_list.find('[itemprop="addressLocality"]').getItem(0)) {
                            contact_data.contact_address_locality = contact_address_locality.getText();
                        }

                        if (contact_postal_code = contact_list.find('[itemprop="postalCode"]').getItem(0)) {
                            contact_data.contact_postal_code = contact_postal_code.getText();
                        }

                        // Other details:
                        var contact_emails_list     = contact_list.find('[itemprop="email"]').toArray();
                        if (contact_emails_list) {
                            var contact_emails = '';
                            CKEDITOR.tools.array.forEach(contact_emails_list, function(value, index, array) {
                                contact_emails += value.getText() + "\n";
                            });
                            contact_data.contact_emails = contact_emails;
                        }

                        var contact_tels_list     = contact_list.find('[itemprop="telephone"]').toArray();
                        if (contact_tels_list) {
                            var contact_tels = '';
                            CKEDITOR.tools.array.forEach(contact_tels_list, function(value, index, array) {
                                contact_tels += value.getText() + "\n";
                            });
                            contact_data.contact_tels = contact_tels;
                        }
                        /*
                        var contact_mobiles_list     = contact_list.find('[itemprop="jobTitle"]').toArray();
                        if (contact_mobiles_list) {
                            var contact_mobiles = '';
                            CKEDITOR.tools.array.forEach(contact_mobiles_list, function(value, index, array) {
                                contact_mobiles += value.getText() + "\n";
                            });
                            contact_data.contact_mobiles = contact_mobiles;
                        }
                        */
                        var contact_faxes_list     = contact_list.find('[itemprop="faxNumber"]').toArray();
                        if (contact_faxes_list) {
                            var contact_faxes = '';
                            CKEDITOR.tools.array.forEach(contact_faxes_list, function(value, index, array) {
                                contact_faxes += value.getText() + "\n";
                            });
                            contact_data.contact_faxes = contact_faxes;
                        }
                        
                        var contact_twitters_list  = contact_list.find('[itemprop="sameAs"][href^="https://www.twitter.com/"]').toArray();
                        if (contact_twitters_list) {
                            var contact_twitters = '';
                            CKEDITOR.tools.array.forEach(contact_twitters_list, function(value, index, array) {
                                contact_twitters += value.getText() + "\n";
                            });
                            contact_data.contact_twitters = contact_twitters;
                        }
                    }
                }

                if (!this.insertMode) {
                    this.setupContent(contact_data);
                }
            },

            onOk: function() {
                var dialog       = this;

                var contact_title = CKEDITOR.tools.trim(dialog.getValueOf('tab-person', 'contact_title'));
                var contact_name  = CKEDITOR.tools.trim(dialog.getValueOf('tab-person', 'contact_name'));
                var contact_url   = CKEDITOR.tools.trim(dialog.getValueOf('tab-person', 'contact_url'));

                var contact_html = [];


                contact_html.push('<dl data-contains="contact-details" itemscope itemtype="http://schema.org/Person">');

                // Person:

                contact_html.push('  <dt>Name</dt>');
                contact_html.push('  <dd>');

                contact_name_composite = '';
                if (contact_title != '') {
                    contact_name_composite += '<b itemprop="honorificPrefix">' + contact_title + '</b> ' ;
                }

                contact_name_composite += '<b itemprop="name">' + contact_name + '</b>';

                if (contact_url != '') {
                    contact_html.push('    <svg display="none" class="icon" aria-hidden="true"><use xlink:href="#icon-person"></use></svg><a href="' + contact_url + '">' + contact_name_composite + '</a>');
                } else {
                    contact_html.push('    <svg display="none" class="icon" aria-hidden="true"><use xlink:href="#icon-person"></use></svg>' + contact_name_composite);
                }

                contact_html.push('  </dd>');

                var contact_roles = CKEDITOR.tools.trim(dialog.getValueOf('tab-person', 'contact_roles'));
                if (contact_roles != '') {
                    var contact_roles_list = contact_roles.split("\n");
                    contact_html.push('  <dt>Role</dt>');
                    CKEDITOR.tools.array.forEach(contact_roles_list, function(value, index, array) {
                        contact_html.push('  <dd itemprop="jobTitle">' + CKEDITOR.tools.trim(value) + '</dd>');
                    });
                }

                // Address:

                var contact_street_address   = CKEDITOR.tools.trim(dialog.getValueOf('tab-address', 'contact_street_address'));
                var contact_address_locality = CKEDITOR.tools.trim(dialog.getValueOf('tab-address', 'contact_address_locality'));
                var contact_postal_code      = CKEDITOR.tools.trim(dialog.getValueOf('tab-address', 'contact_postal_code'));

                if (contact_street_address != '' && contact_address_locality != '' && contact_postal_code != '') {

                    contact_street_address = contact_street_address.replace(/\n/g, "<br>\n");

                    contact_html.push('  <dt>Address</dt>');
                    contact_html.push('  <dd itemscope itemtype="http://schema.org/PostalAddress"><svg display="none" class="icon" aria-hidden="true"><use xlink:href="#icon-building"></use></svg><span itemprop="streetAddress">' + contact_street_address + '</span><br>');
                    contact_html.push('  <span itemprop="addressLocality">' + contact_address_locality + '</span><br>');
                    contact_html.push('  <span itemprop="postalCode">' + contact_postal_code + '</span></dd>');
                }


                // Other details:

                var contact_emails = CKEDITOR.tools.trim(dialog.getValueOf('tab-details', 'contact_emails'));
                if (contact_emails != '') {
                    var contact_emails_list = contact_emails.split("\n");
                    contact_html.push('  <dt>Email</dt>');
                    CKEDITOR.tools.array.forEach(contact_emails_list, function(value, index, array) {
                        contact_html.push('  <dd>');
                        contact_html.push('    <svg display="none" class="icon" aria-hidden="true"><use xlink:href="#icon-email"></use></svg><a href="mailto:' + CKEDITOR.tools.trim(value) + '" itemprop="email">' + CKEDITOR.tools.trim(value) + '</a>');
                        contact_html.push('  </dd>');
                    });
                }

                var contact_tels = CKEDITOR.tools.trim(dialog.getValueOf('tab-details', 'contact_tels'));
                if (contact_tels != '') {
                    var contact_tels_list = contact_tels.split("\n");
                    contact_html.push('  <dt>Tel</dt>');
                    CKEDITOR.tools.array.forEach(contact_tels_list, function(value, index, array) {
                        contact_html.push('  <dd itemprop="telephone">');
                        contact_html.push('    <svg display="none" class="icon" aria-hidden="true"><use xlink:href="#icon-phone"></use></svg>' + CKEDITOR.tools.trim(value));
                        contact_html.push('  </dd>');
                    });
                }


                var contact_faxes = CKEDITOR.tools.trim(dialog.getValueOf('tab-details', 'contact_faxes'));
                if (contact_faxes != '') {
                    var contact_faxes_list = contact_faxes.split("\n");
                    contact_html.push('  <dt>Fax</dt>');
                    CKEDITOR.tools.array.forEach(contact_faxes_list, function(value, index, array) {
                        contact_html.push('  <dd itemprop="faxNumber">');
                        contact_html.push('    <svg display="none" class="icon" aria-hidden="true"><use xlink:href="#icon-fax"></use></svg>' + CKEDITOR.tools.trim(value));
                        contact_html.push('  </dd>');
                    });
                }
                
                var contact_twitters = CKEDITOR.tools.trim(dialog.getValueOf('tab-details', 'contact_twitters'));
                if (contact_twitters != '') {
                    var contact_twitters_list = contact_twitters.split("\n");
                    contact_html.push('  <dt>Twitter</dt>');
                    CKEDITOR.tools.array.forEach(contact_twitters_list, function(value, index, array) {
                        contact_html.push('  <dd>');
                        contact_html.push('    <svg display="none" class="icon" aria-hidden="true"><use xlink:href="#icon-twitter"></use></svg><a href="https://www.twitter.com/' + CKEDITOR.tools.trim(value) + '" itemprop="sameAs">' + CKEDITOR.tools.trim(value) + '</a>');
                        contact_html.push('  </dd>');
                    });
                }

                contact_html.push('</dl>');

                editor.insertHtml(contact_html.join("\n"));
            }
        };
    });



//}());
