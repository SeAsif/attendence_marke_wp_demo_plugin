<?php
/**
 * @wordpress-plugin
 * Plugin Name:     Attendence Tracking Demo
 * Plugin URI:        
 * Description:     This is a video course attendence tracking demo plugin for wordpress.
 * Version:         1.0.0
 * Author:          M.Asif
 * Author URI:      
 * License:         
 * License URI:      
 */


// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

//Wp_hook
add_filter( 'the_content', 'ATD_Attendence_tracking' );

if( !defined('ATD_PLUGIN_VERSION')){
	define("ATD_PLUGIN_VERSION","1.0.0");
}


/**
*
*Setting div to show video player
*
**/
function ATD_Attendence_tracking($message){
	 $message = '<div id="vimeo"> Vimeo video player </div>';
	return  $message ;
}


/**
*
* Adding local css & js files enqueue
*
**/
function atd_plugin_scripts() {
		//getting files from assets
		wp_register_script('jquery', plugins_url('assets/js/jquery.min.js', __FILE__));
		wp_enqueue_style('sweetalertcss', plugins_url('assets/sweetalerts2/css/sweetalert2.css', __FILE__) ); 
		wp_register_script('sweetalertjs', plugins_url('assets/sweetalerts2/js/sweetalert2.all.min.js', __FILE__));
		wp_register_script('player', plugins_url('assets/js/player.js', __FILE__));
		wp_register_script('main', plugins_url('assets/js/main.js', __FILE__));

		//wp_enqueue_script
		wp_enqueue_script('jquery');
		wp_enqueue_style('sweetalertcss');
		wp_enqueue_script('sweetalertjs');
		wp_enqueue_script('player');
		wp_enqueue_script('main');
}
add_action( 'wp_enqueue_scripts', 'atd_plugin_scripts' ); 

/**
*
* Calling function on ajax post
*
**/
function mark_attendce() {
    $user_id = isset($_POST['user_id'])?trim($_POST['user_id']):"";
	$duration = isset($_POST['duration'])?trim($_POST['duration']):"";
	
	$data=["user_id"=>$user_id,"duration"=>$duration];
	/**
	*
	* Now we have recieved data from client successfully 
	* & Attendence will be mark here 
	*
	**/
	
	
	//Response to client
    $response= ["code"=>201,"type"=>"success","message"=>"Attendence Marked Successfully","data"=>$data];
    echo json_encode($response);
    exit;
}

add_action("wp_ajax_mark_attendce", "mark_attendce");
add_action("wp_ajax_nopriv_mark_attendce", "mark_must_login");


/**
*
* Registering action to admin-ajax
*
**/
function custom_ajax_script_enqueuer() {
   wp_register_script( "custom_ajax_script", plugins_url('assets/js/main.js', __FILE__));
   wp_localize_script( 'custom_ajax_script', 'myAjax', 
   array( 'ajaxurl' => admin_url( 'admin-ajax.php' ),
   //set get_current_user_id to this array for purpose of future usage in javascript 
   "user_id"=>get_current_user_id()));        
   wp_enqueue_script( 'jquery' );
   wp_enqueue_script( 'custom_ajax_script' );

}
add_action( 'init', 'custom_ajax_script_enqueuer' );


?>