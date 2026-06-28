# Cabeçalho da biblioteca padrão &lt;source_location&gt; (C++20)

Este cabeçalho faz parte da biblioteca [utility](<#/doc/utility>).

### Classes

---
[ source_location](<#/doc/utility/source_location>)(C++20) | uma classe que representa informações sobre o código-fonte, como nomes de arquivos, números de linha e nomes de funções
(classe)

### Sinopse
```cpp
    namespace std {
      struct source_location;
    }
```

#### Classe [std::source_location](<#/doc/utility/source_location>)
```cpp
    namespace std {
      struct source_location {
        // source location construction
        static consteval source_location current() noexcept;
        constexpr source_location() noexcept;
    
        // source location field access
        constexpr uint_least32_t line() const noexcept;
        constexpr uint_least32_t column() const noexcept;
        constexpr const char* file_name() const noexcept;
        constexpr const char* function_name() const noexcept;
    
      private:
        uint_least32_t line_;               // exposition only
        uint_least32_t column_;             // exposition only
        const char* file_name_;             // exposition only
        const char* function_name_;         // exposition only
      };
    }
```