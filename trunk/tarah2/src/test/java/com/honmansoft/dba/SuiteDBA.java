package com.honmansoft.dba;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(Suite.class)
@SuiteClasses( { 
	AddRemoveColumnTest.class,
	CreateDropDatabaseTest.class,
	CreateDropTableTest.class,
	TypeMappingTest.class})
public class SuiteDBA {

}
