package com.netease.nis.haoqi;

import java.util.Arrays;
import java.util.List;

public class Test {
	private final static String BLOB = "blob";
	public static void main(String[] args) {
		List<String> a = Arrays.asList(new String[] {				BLOB,		});
		
		for(String b:a){
			System.out.println(b);
		}
	}
}
