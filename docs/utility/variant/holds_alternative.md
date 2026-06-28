# std::holds_alternative

Definido no cabeçalho `[<variant>](<#/doc/header/variant>)`

```c
template< class T, class... Types >
constexpr bool holds_alternative( const std::variant<Types...>& v ) noexcept;
```

Verifica se a variant `v` contém a alternativa `T`. A chamada é malformada se `T` não aparecer exatamente uma vez em `Types...`

### Parâmetros

- **v** — variant para examinar

### Valor de retorno

`true` se a variant atualmente contém a alternativa `T`, `false` caso contrário.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <string>
    #include <variant>
    
    int main()
    {
        std::variant<int, std::string> v = "abc";
        assert(not std::holds_alternative<int>(v));
        assert(std::holds_alternative<std::string>(v));
    }
```

### Veja também

[ index](<#/doc/utility/variant/index>) | retorna o índice baseado em zero da alternativa contida pela `variant`
(função membro pública)
[ get(std::variant)](<#/doc/utility/variant/get>)(C++17) | lê o valor da variant dado o índice ou o tipo (se o tipo for único), lança exceção em caso de erro
(template de função)