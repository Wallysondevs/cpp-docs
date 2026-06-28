# std::errc

Definido no cabeçalho `[<system_error>](<#/doc/header/system_error>)`

```c
enum class errc;
```

A enumeração com escopo `std::errc` define os valores de condições de erro portáveis que correspondem aos códigos de erro POSIX.

### Constantes Membro

Nome | Erro POSIX Equivalente
---|---
`address_family_not_supported` | `EAFNOSUPPORT`
`address_in_use` | `EADDRINUSE`
`address_not_available` | `EADDRNOTAVAIL`
`already_connected` | `EISCONN`
`argument_list_too_long` | `E2BIG`
`argument_out_of_domain` | `EDOM`
`bad_address` | `EFAULT`
`bad_file_descriptor` | `EBADF`
`bad_message` | `EBADMSG`
`broken_pipe` | `EPIPE`
`connection_aborted` | `ECONNABORTED`
`connection_already_in_progress` | `EALREADY`
`connection_refused` | `ECONNREFUSED`
`connection_reset` | `ECONNRESET`
`cross_device_link` | `EXDEV`
`destination_address_required` | `EDESTADDRREQ`
`device_or_resource_busy` | `EBUSY`
`directory_not_empty` | `ENOTEMPTY`
`executable_format_error` | `ENOEXEC`
`file_exists` | `EEXIST`
`file_too_large` | `EFBIG`
`filename_too_long` | `ENAMETOOLONG`
`function_not_supported` | `ENOSYS`
`host_unreachable` | `EHOSTUNREACH`
`identifier_removed` | `EIDRM`
`illegal_byte_sequence` | `EILSEQ`
`inappropriate_io_control_operation` | `ENOTTY`
`interrupted` | `EINTR`
`invalid_argument` | `EINVAL`
`invalid_seek` | `ESPIPE`
`io_error` | `EIO`
`is_a_directory` | `EISDIR`
`message_size` | `EMSGSIZE`
`network_down` | `ENETDOWN`
`network_reset` | `ENETRESET`
`network_unreachable` | `ENETUNREACH`
`no_buffer_space` | `ENOBUFS`
`no_child_process` | `ECHILD`
`no_link` | `ENOLINK`
`no_lock_available` | `ENOLCK`
`no_message_available` (deprecated) | `ENODATA`
`no_message` | `ENOMSG`
`no_protocol_option` | `ENOPROTOOPT`
`no_space_on_device` | `ENOSPC`
`no_stream_resources` (deprecated) | `ENOSR`
`no_such_device_or_address` | `ENXIO`
`no_such_device` | `ENODEV`
`no_such_file_or_directory` | `ENOENT`
`no_such_process` | `ESRCH`
`not_a_directory` | `ENOTDIR`
`not_a_socket` | `ENOTSOCK`
`not_a_stream` (deprecated) | `ENOSTR`
`not_connected` | `ENOTCONN`
`not_enough_memory` | `ENOMEM`
`not_supported` | `ENOTSUP`
`operation_canceled` | `ECANCELED`
`operation_in_progress` | `EINPROGRESS`
`operation_not_permitted` | `EPERM`
`operation_not_supported` | `EOPNOTSUPP`
`operation_would_block` | `EWOULDBLOCK`
`owner_dead` | `EOWNERDEAD`
`permission_denied` | `EACCES`
`protocol_error` | `EPROTO`
`protocol_not_supported` | `EPROTONOSUPPORT`
`read_only_file_system` | `EROFS`
`resource_deadlock_would_occur` | `EDEADLK`
`resource_unavailable_try_again` | `EAGAIN`
`result_out_of_range` | `ERANGE`
`state_not_recoverable` | `ENOTRECOVERABLE`
`stream_timeout` (deprecated) | `ETIME`
`text_file_busy` | `ETXTBSY`
`timed_out` | `ETIMEDOUT`
`too_many_files_open_in_system` | `ENFILE`
`too_many_files_open` | `EMFILE`
`too_many_links` | `EMLINK`
`too_many_symbolic_link_levels` | `ELOOP`
`value_too_large` | `EOVERFLOW`
`wrong_protocol_type` | `EPROTOTYPE`

### Funções Não-Membro

[ make_error_code(std::errc)](<#/doc/error/errc/make_error_code>)(C++11) | cria um valor de código de erro para o enum `errc` e
(função)
[ make_error_condition(std::errc)](<#/doc/error/errc/make_error_condition>)(C++11) | cria uma condição de erro para um valor `errc` e
(função)

### Classes Auxiliares

[ is_error_condition_enum<std::errc>](<#/doc/error/errc/is_error_condition_enum>)(C++11) | estende o type trait [std::is_error_condition_enum](<#/doc/error/error_condition/is_error_condition_enum>) para identificar valores `errc` como condições de erro
(modelo de função)

### Exemplo

Execute este código
```cpp
    #include <filesystem>
    #include <fstream>
    #include <iomanip>
    #include <iostream>
    #include <string>
    #include <system_error>
    #include <thread>
    
    void print_error(const std::string& details, std::error_code error_code)
    {
        std::string value_name;
        if (error_code == std::errc::invalid_argument)
            value_name = "std::errc::invalid_argument";
        if (error_code == std::errc::no_such_file_or_directory)
            value_name = "std::errc::no_such_file_or_directory";
        if (error_code == std::errc::is_a_directory)
            value_name = "std::errc::is_a_directory";
        if (error_code == std::errc::permission_denied)
            value_name = "std::errc::permission_denied";
    
        std::cout << details << ":\n  "
                  << std::quoted(error_code.message())
                  << " (" << value_name << ")\n\n";
    }
    
    void print_errno(const std::string& details, int errno_value = errno)
    {
        print_error(details, std::make_error_code(std::errc(errno_value)));
    }
    
    int main()
    {
        std::cout << "Detaching a not-a-thread...\n";
        try
        {
            std::thread().detach();
        }
        catch (const std::system_error& e)
        {
            print_error("Error detaching empty thread", e.code());
        }
    
        std::cout << "Opening nonexistent file...\n";
        std::ifstream nofile{"nonexistent-file"};
        if (!nofile.is_open())
            print_errno("Error opening nonexistent file for reading");
    
        std::cout << "Reading from directory as a file...\n";
        std::filesystem::create_directory("dir");
        std::ifstream dir_stream{"dir"};
        [[maybe_unused]] char c = dir_stream.get();
        if (!dir_stream.good())
            print_errno("Error reading data from directory");
    
        std::cout << "Open read-only file for writing...\n";
        std::fstream{"readonly-file", std::ios::out};
        std::filesystem::permissions("readonly-file", std::filesystem::perms::owner_read);
        std::fstream write_readonly("readonly-file", std::ios::out);
        if (!write_readonly.is_open())
            print_errno("Error opening read-only file for writing");
    }
```

Saída possível:
```
    Detaching a not-a-thread...
    Error detaching empty thread:
      "Invalid argument" (std::errc::invalid_argument)
    
    Opening nonexistent file...
    Error opening nonexistent file for reading:
      "No such file or directory" (std::errc::no_such_file_or_directory)
    
    Reading from directory as a file...
    Error reading data from directory:
      "Is a directory" (std::errc::is_a_directory)
    
    Open read-only file for writing...
    Error opening read-only file for writing:
      "Permission denied" (std::errc::permission_denied)
```

### Relatórios de Defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3869](<https://cplusplus.github.io/LWG/issue3869>) | C++11 | as constantes membro `no_message_available`, `no_stream_resources`, `not_a_stream` e `stream_timeout` referiam-se à API POSIX STREAMS obsoleta[1](<#/doc/error/errc>) | as depreciou

1. [↑](<#/doc/error/errc>) Embora os números de erro POSIX correspondentes ENODATA, ENOSR, ENOSTR e ETIME tenham sido marcados como "obsoletos" no POSIX 2017, a API STREAMS era opcional e não era exigida para conformidade com o padrão POSIX anterior (porque sistemas tipo Unix populares se recusaram a implementá-la).

### Veja também

[ error_code](<#/doc/error/error_code>)(C++11) | mantém um código de erro dependente da plataforma
(classe)
[ error_condition](<#/doc/error/error_condition>)(C++11) | mantém um código de erro portável
(classe)