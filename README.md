# Supporting Add-on for Alert Manager Demo Data
- **Authors**:		Simon Balz <simon@balz.me>, Mika Borner <mika.borner@gmail.com>
- **Description**:	Supporting Add-on for Alert Manager Demo Data (https://github.com/simcen/alert_manager)
- **Version**: 		1.0

## Release Notes
- **v1.0**    /   2015-01-19
    - Final release for Splunk Apptitude submission
- **v0.2**    /   2014-12-28
    - Better sample data
    - Setup view enhancements
    - Added support to clear sample data
    - Added support to load alert users
- **v0.1.1**  /   2014-12-26
    - Initial working version

## Changelog
- **2014-12-28** simon@balz.me
    - Fixed incident change sample data according to a bugfix in auto_ttl_resolve scenario
    - Added alert_users sample data
- **2014-12-26** simon@balz.me
    - Setup view improvements
    - Fixed a bug with wrong extenion of sample data files
    - Released v0.1
    - Documentation improvement
    - Added support to clear incidents and incident settings
    - Changed sample data loads to append instead of overwrite
    - Additional static sample data
- **2014-12-25** simon@balz.me
    - Added functionality to load alert metadata
- **2014-12-24** simon@balz.me
	- Better sample data
	- Added more sample alerts
    - Added setup view to load static data and enable/disable demo alerts
- **2014-12-23** simon@balz.me
	- Added initial demo data, demo alerts
	- Added load data search

## Credits

## Prerequisites
- Splunk v6.2 and above
- Alert Manager app (<https://github.com/simcen/alert_manager>) installed
- Add-on for Alert Manager (<https://github.com/simcen/TA-alert_manager>) installed

## Usage
### Deployment Matrix

<table>
	<tr>
		<td></td>
		<td>Alert Manager</td>
		<td>Add-on for Alert Manager</td>
        <td>Supporting Add-on for Alert Manager Demo Data</td>
	</tr>
    <tr>
        <td>Search Head</td>
        <td>x</td>
        <td>x</td>
        <td>x</td>
    </tr>
    <tr>
    	<td>Indexer</td>
    	<td></td>
    	<td>x</td>
        <td></td>
    </tr>
</table>

**Note:** If you forward events from the search head trough heavy forwarder to the indexer, install the Add-on on the heavy forwarder and disable the index.

### Installation
1. Unpack and install app to $SPLUNK_HOME/etc/apps
2. Restart Splunk
3. Open Splunk -> Goto the 'Alert Manager Demo Data' app
4. Follow the instructions

**Note**: If you don't use the default "alerts" index (check at your alert manager's app setup: <http://your_splunk_server:8000/en-US/manager/alert_manager/apps/local/alert_manager/setup?action=edit>), copy default/inputs.conf to local/ and adjust the index parameter.

## Known Issues
- Demo data is not perfect. There are only resolved inicdents in the last 24 hours. Will be fixed later

## License
- **This work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.**
- Details: <http://creativecommons.org/licenses/by-nc-sa/4.0/>
