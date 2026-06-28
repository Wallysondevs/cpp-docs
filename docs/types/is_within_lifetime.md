# std::is_within_lifetime

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
consteval bool is_within_lifetime( const T* ptr ) noexcept;
```

Determina se o ponteiro ptr aponta para um objeto que está dentro de seu [tempo de vida](<#/doc/language/lifetime>).

Durante a avaliação de uma expressão E como uma expressão constante central (core constant expression), uma chamada para `std::is_within_lifetime` é malformada (ill-formed) a menos que ptr aponte para um objeto

  * que é [utilizável em expressões constantes](<#/doc/language/constant_expression>), ou
  * cujo tempo de vida do objeto completo começou dentro de E.

### Parâmetros

- **p** — ponteiro a ser detectado

### Valor de retorno

true se o ponteiro ptr aponta para um objeto que está dentro de seu tempo de vida; caso contrário, false.

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_is_within_lifetime`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Verificando se uma alternativa de union está ativa

### Exemplo

`std::is_within_lifetime` pode ser usado para verificar se um membro de union está ativo:

Run this code
```cpp
    #include <type_traits>
    
    // um tipo booleano opcional ocupando apenas um byte,
    // assumindo sizeof(bool) == sizeof(char)
    struct optional_bool
    {
        union { bool b; char c; };
    
        // assumindo que as representações de valor para true e false
        // são distintas da representação de valor para 2
        constexpr optional_bool() : c(2) {}
        constexpr optional_bool(bool b) : b(b) {}
    
        constexpr auto has_value() const -> bool
        {
            if consteval
            {
                return std::is_within_lifetime(&b); // durante a avaliação constante,
                                                    // não pode ler de c
            }
            else
            {
                return c != 2; // durante o tempo de execução, deve ler de c
            }
        }
    
        constexpr auto operator*() -> bool&
        {
            return b;
        }
    };
    
    int main()
    {
        constexpr optional_bool disengaged;
        constexpr optional_bool engaged(true);
    
        static_assert(!disengaged.has_value());
        static_assert(engaged.has_value());
        static_assert(*engaged);
    }
```