# Cabeçalho da biblioteca padrão &lt;system_error&gt; (C++11)

Este cabeçalho faz parte da biblioteca de [tratamento de erros](<#/doc/error>).

### Inclusões

---
[ &lt;compare&gt;](<#/doc/header/compare>)(C++20) | Suporte para o [operador de comparação de três vias](<#/doc/language/operator_comparison>)

### Classes

[ error_category](<#/doc/error/error_category>)(C++11) | classe base para categorias de erro
(class)
[ error_condition](<#/doc/error/error_condition>)(C++11) | contém um código de erro portátil
(class)
[ errc](<#/doc/error/errc>)(C++11) | a enumeração [std::error_condition](<#/doc/error/error_condition>) listando todas as constantes de macro padrão [`<cerrno>`](<#/doc/header/cerrno>)
(class)
[ error_code](<#/doc/error/error_code>)(C++11) | contém um código de erro dependente da plataforma
(class)
[ system_error](<#/doc/error/system_error>)(C++11) | classe de exceção usada para reportar condições que possuem um `error_code`
(class)
[ is_error_code_enum](<#/doc/error/error_code/is_error_code_enum>)(C++11) | identifica uma classe como uma enumeração `error_code`
(class template)
[ is_error_condition_enum](<#/doc/error/error_condition/is_error_condition_enum>)(C++11) | identifica uma enumeração como um [std::error_condition](<#/doc/error/error_condition>)
(class template)
[ std::hash<std::error_code>](<#/doc/error/error_code/hash>)(C++11) | suporte a hash para [`std::error_code`](<#/doc/error/error_code>)
(class template specialization)

##### Declarações antecipadas

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```cpp
 hash(C++11)
(class template)
```

### Funções

[ generic_category](<#/doc/error/generic_category>)(C++11) | identifica a categoria de erro genérica
(function)
[ system_category](<#/doc/error/system_category>)(C++11) | identifica a categoria de erro do sistema operacional
(function)
[ operator==operator!=operator<operator<=>](<#/doc/error/error_code/operator_cmp>)(removido em C++20)(removido em C++20)(C++20) | compara dois `error_code`s
(function)
[ operator<<](<#/doc/error/error_code/operator_ltlt>) | envia o valor e o nome da categoria para um stream de saída
(function)
[ make_error_code(std::errc)](<#/doc/error/errc/make_error_code>)(C++11) | cria um valor de `error_code` para o enum `errc` e
(function)
[ operator==operator!=operator<operator<=>](<#/doc/error/error_condition/operator_cmp>)(removido em C++20)(removido em C++20)(C++20) | compara `error_condition`s e `error_code`s
(function)
[ make_error_condition(std::errc)](<#/doc/error/errc/make_error_condition>)(C++11) | cria uma `error_condition` para um valor `errc` e
(function)

### Sinopse
```cpp
    #include <compare>
    
    namespace std {
      class error_category;
      const error_category& generic_category() noexcept;
      const error_category& system_category() noexcept;
    
      class error_code;
      class error_condition;
      class system_error;
    
      template<class T>
        struct is_error_code_enum : public false_type {};
    
      template<class T>
        struct is_error_condition_enum : public false_type {};
    
      enum class errc { // freestanding
        address_family_not_supported,       // EAFNOSUPPORT
        address_in_use,                     // EADDRINUSE
        address_not_available,              // EADDRNOTAVAIL
        already_connected,                  // EISCONN
        argument_list_too_long,             // E2BIG
        argument_out_of_domain,             // EDOM
        bad_address,                        // EFAULT
        bad_file_descriptor,                // EBADF
        bad_message,                        // EBADMSG
        broken_pipe,                        // EPIPE
        connection_aborted,                 // ECONNABORTED
        connection_already_in_progress,     // EALREADY
        connection_refused,                 // ECONNREFUSED
        connection_reset,                   // ECONNRESET
        cross_device_link,                  // EXDEV
        destination_address_required,       // EDESTADDRREQ
        device_or_resource_busy,            // EBUSY
        directory_not_empty,                // ENOTEMPTY
        executable_format_error,            // ENOEXEC
        file_exists,                        // EEXIST
        file_too_large,                     // EFBIG
        filename_too_long,                  // ENAMETOOLONG
        function_not_supported,             // ENOSYS
        host_unreachable,                   // EHOSTUNREACH
        identifier_removed,                 // EIDRM
        illegal_byte_sequence,              // EILSEQ
        inappropriate_io_control_operation, // ENOTTY
        interrupted,                        // EINTR
        invalid_argument,                   // EINVAL
        invalid_seek,                       // ESPIPE
        io_error,                           // EIO
        is_a_directory,                     // EISDIR
        message_size,                       // EMSGSIZE
        network_down,                       // ENETDOWN
        network_reset,                      // ENETRESET
        network_unreachable,                // ENETUNREACH
        no_buffer_space,                    // ENOBUFS
        no_child_process,                   // ECHILD
        no_link,                            // ENOLINK
        no_lock_available,                  // ENOLCK
        no_message_available,               // ENODATA
        no_message,                         // ENOMSG
        no_protocol_option,                 // ENOPROTOOPT
        no_space_on_device,                 // ENOSPC
        no_stream_resources,                // ENOSR
        no_such_device_or_address,          // ENXIO
        no_such_device,                     // ENODEV
        no_such_file_or_directory,          // ENOENT
        no_such_process,                    // ESRCH
        not_a_directory,                    // ENOTDIR
        not_a_socket,                       // ENOTSOCK
        not_a_stream,                       // ENOSTR
        not_connected,                      // ENOTCONN
        not_enough_memory,                  // ENOMEM
        not_supported,                      // ENOTSUP
        operation_canceled,                 // ECANCELED
        operation_in_progress,              // EINPROGRESS
        operation_not_permitted,            // EPERM
        operation_not_supported,            // EOPNOTSUPP
        operation_would_block,              // EWOULDBLOCK
        owner_dead,                         // EOWNERDEAD
        permission_denied,                  // EACCES
        protocol_error,                     // EPROTO
        protocol_not_supported,             // EPROTONOSUPPORT
        read_only_file_system,              // EROFS
        resource_deadlock_would_occur,      // EDEADLK
        resource_unavailable_try_again,     // EAGAIN
        result_out_of_range,                // ERANGE
        state_not_recoverable,              // ENOTRECOVERABLE
        stream_timeout,                     // ETIME
        text_file_busy,                     // ETXTBSY
        timed_out,                          // ETIMEDOUT
        too_many_files_open_in_system,      // ENFILE
        too_many_files_open,                // EMFILE
        too_many_links,                     // EMLINK
        too_many_symbolic_link_levels,      // ELOOP
        value_too_large,                    // EOVERFLOW
        wrong_protocol_type,                // EPROTOTYPE
      };
    
      template<> struct is_error_condition_enum<errc> : true_type {};
    
      // funções não-membro
      error_code make_error_code(errc e) noexcept;
    
      template<class CharT, class Traits>
        basic_ostream<CharT, Traits>&
          operator<<(basic_ostream<CharT, Traits>& os, const error_code& ec);
    
      // funções não-membro
      error_condition make_error_condition(errc e) noexcept;
    
      // funções de comparação
      bool operator==(const error_code& lhs, const error_code& rhs) noexcept;
      bool operator==(const error_code& lhs, const error_condition& rhs) noexcept;
      bool operator==(const error_condition& lhs, const error_condition& rhs) noexcept;
      strong_ordering operator<=>(const error_code& lhs,
                                  const error_code& rhs) noexcept;
      strong_ordering operator<=>(const error_condition& lhs,
                                  const error_condition& rhs) noexcept;
    
      // suporte a hash
      template<class T> struct hash;
      template<> struct hash<error_code>;
      template<> struct hash<error_condition>;
    
      // suporte a erro de sistema
      template<class T>
        inline constexpr bool is_error_code_enum_v = is_error_code_enum<T>::value;
      template<class T>
        inline constexpr bool is_error_condition_enum_v = is_error_condition_enum<T>::value;
    }
```

#### Classe [std::error_category](<#/doc/error/error_category>)
```cpp
    namespace std {
      class error_category {
      public:
        constexpr error_category() noexcept;
        virtual ~error_category();
        error_category(const error_category&) = delete;
        error_category& operator=(const error_category&) = delete;
        virtual const char* name() const noexcept = 0;
        virtual error_condition default_error_condition(int ev) const noexcept;
        virtual bool equivalent(int code, const error_condition& condition) const noexcept;
        virtual bool equivalent(const error_code& code, int condition) const noexcept;
        virtual string message(int ev) const = 0;
    
        bool operator==(const error_category& rhs) const noexcept;
        strong_ordering operator<=>(const error_category& rhs) const noexcept;
      };
    
      const error_category& generic_category() noexcept;
      const error_category& system_category() noexcept;
    }
```

#### Classe [std::error_code](<#/doc/error/error_code>)
```cpp
    namespace std {
      class error_code {
      public:
        // construtores
        error_code() noexcept;
        error_code(int val, const error_category& cat) noexcept;
        template<class ErrorCodeEnum>
          error_code(ErrorCodeEnum e) noexcept;
    
        // modificadores
        void assign(int val, const error_category& cat) noexcept;
        template<class ErrorCodeEnum>
          error_code& operator=(ErrorCodeEnum e) noexcept;
        void clear() noexcept;
    
        // observadores
        int value() const noexcept;
        const error_category& category() const noexcept;
        error_condition default_error_condition() const noexcept;
        string message() const;
        explicit operator bool() const noexcept;
    
      private:
        int val_;                   // apenas para exposição
        const error_category* cat_; // apenas para exposição
      };
    
      // funções não-membro
      error_code make_error_code(errc e) noexcept;
    
      template<class CharT, class Traits>
        basic_ostream<CharT, Traits>&
          operator<<(basic_ostream<CharT, Traits>& os, const error_code& ec);
    }
```

#### Classe [std::error_condition](<#/doc/error/error_condition>)
```cpp
    namespace std {
      class error_condition {
      public:
        // construtores
        error_condition() noexcept;
        error_condition(int val, const error_category& cat) noexcept;
        template<class ErrorConditionEnum>
          error_condition(ErrorConditionEnum e) noexcept;
    
        // modificadores
        void assign(int val, const error_category& cat) noexcept;
        template<class ErrorConditionEnum>
          error_condition& operator=(ErrorConditionEnum e) noexcept;
        void clear() noexcept;
    
        // observadores
        int value() const noexcept;
        const error_category& category() const noexcept;
        string message() const;
        explicit operator bool() const noexcept;
    
      private:
        int val_;                   // apenas para exposição
        const error_category* cat_; // apenas para exposição
      };
    }
```

#### Classe [std::system_error](<#/doc/error/system_error>)
```cpp
    namespace std {
      class system_error : public runtime_error {
      public:
        system_error(error_code ec, const string& what_arg);
        system_error(error_code ec, const char* what_arg);
        system_error(error_code ec);
        system_error(int ev, const error_category& ecat, const string& what_arg);
        system_error(int ev, const error_category& ecat, const char* what_arg);
        system_error(int ev, const error_category& ecat);
        const error_code& code() const noexcept;
        const char* what() const noexcept override;
      };
    }
```