# Header da biblioteca padrão &lt;stdexcept&gt;

Este header faz parte da [biblioteca de tratamento de erros](<#/doc/error>).

### Classes

---
[ logic_error](<#/doc/error/logic_error>) | classe de exceção para indicar violações de pré-condições lógicas ou invariantes de classe
(class)
[ invalid_argument](<#/doc/error/invalid_argument>) | classe de exceção para reportar argumentos inválidos
(class)
[ domain_error](<#/doc/error/domain_error>) | classe de exceção para reportar erros de domínio
(class)
[ length_error](<#/doc/error/length_error>) | classe de exceção para reportar tentativas de exceder o tamanho máximo permitido
(class)
[ out_of_range](<#/doc/error/out_of_range>) | classe de exceção para reportar argumentos fora do range esperado
(class)
[ runtime_error](<#/doc/error/runtime_error>) | classe de exceção para indicar condições detectáveis apenas em tempo de execução
(class)
[ range_error](<#/doc/error/range_error>) | classe de exceção para reportar erros de range em computações internas
(class)
[ overflow_error](<#/doc/error/overflow_error>) | classe de exceção para reportar overflows aritméticos
(class)
[ underflow_error](<#/doc/error/underflow_error>) | classe de exceção para reportar underflows aritméticos
(class)

### Sinopse
```cpp
    namespace std {
        class logic_error;
        class domain_error;
        class invalid_argument;
        class length_error;
        class out_of_range;
        class runtime_error;
        class range_error;
        class overflow_error;
        class underflow_error;
    }
```

#### Class [std::logic_error](<#/doc/error/logic_error>)
```cpp
    namespace std {
      class logic_error : public exception {
      public:
        explicit logic_error(const string& what_arg);
        explicit logic_error(const char* what_arg);
      };
    }
```

#### Class [std::domain_error](<#/doc/error/domain_error>)
```cpp
    namespace std {
      class domain_error : public logic_error {
      public:
        explicit domain_error(const string& what_arg);
        explicit domain_error(const char* what_arg);
      };
    }
```

#### Class [std::invalid_argument](<#/doc/error/invalid_argument>)
```cpp
    namespace std {
      class invalid_argument : public logic_error {
      public:
        explicit invalid_argument(const string& what_arg);
        explicit invalid_argument(const char* what_arg);
      };
    }
```

#### Class [std::length_error](<#/doc/error/length_error>)
```cpp
    namespace std {
      class length_error : public logic_error {
      public:
        explicit length_error(const string& what_arg);
        explicit length_error(const char* what_arg);
      };
    }
```

#### Class [std::out_of_range](<#/doc/error/out_of_range>)
```cpp
    namespace std {
      class out_of_range : public logic_error {
      public:
        explicit out_of_range(const string& what_arg);
        explicit out_of_range(const char* what_arg);
      };
    }
```

#### Class [std::runtime_error](<#/doc/error/runtime_error>)
```cpp
    namespace std {
      class runtime_error : public exception {
      public:
        explicit runtime_error(const string& what_arg);
        explicit runtime_error(const char* what_arg);
      };
    }
```

#### Class [std::range_error](<#/doc/error/range_error>)
```cpp
    namespace std {
      class range_error : public runtime_error {
      public:
        explicit range_error(const string& what_arg);
        explicit range_error(const char* what_arg);
      };
    }
```

#### Class [std::overflow_error](<#/doc/error/overflow_error>)
```cpp
    namespace std {
      class overflow_error : public runtime_error {
      public:
        explicit overflow_error(const string& what_arg);
        explicit overflow_error(const char* what_arg);
      };
    }
```

#### Class [std::underflow_error](<#/doc/error/underflow_error>)
```cpp
    namespace std {
      class underflow_error : public runtime_error {
      public:
        explicit underflow_error(const string& what_arg);
        explicit underflow_error(const char* what_arg);
      };
    }
```

### Veja também

[ exception](<#/doc/error/exception>) | classe base para exceções lançadas pelos componentes da standard library
(class)