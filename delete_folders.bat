set /a count = 0
@REM script for deleting folders
@REM first we ask user to input folder name and save it to variable
@set /p foldername=Enter folder name:
@REM then we recursively search for folders with that name and print their path


FOR /d /r . %%d IN (%foldername%) DO @IF EXIST "%%d" (
set /a count += 1
ECHO "%%d"
)
@REM if no folders found, we print message and exit
IF %count%==0 (
ECHO "No folders found"
set /p pause="Press Enter to exit."
exit
)
set /p pause="Press enter to delete these folders (%count%)."

FOR /d /r . %%d IN (%foldername%) DO @IF EXIST "%%d" (
ECHO "Deleting %%d"
rd /s /q "%%d"
)

set /p pause="Press Enter to exit."