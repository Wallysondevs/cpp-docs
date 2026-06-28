# std::format_error

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
class format_error;
```

Define o tipo de objeto de exceção lançado para reportar erros na biblioteca de formatação.

Diagrama de herança

### Funções membro

(construtor) | constrói um novo objeto `format_error` com a mensagem fornecida
(função membro pública)
operator= | substitui o objeto `format_error`
(função membro pública)

## std::format_error::format_error

```cpp
format_error( const std::string& what_arg );  // (1)
format_error( const char* what_arg );  // (2)
format_error( const format_error& other ) noexcept;  // (3)
```

1) Constrói o objeto de exceção com `what_arg` como string explicativa. Após a construção, [std::strcmp](<#/doc/string/byte/strcmp>)(what(), what_arg.c_str()) == 0.

2) Constrói o objeto de exceção com `what_arg` como string explicativa. Após a construção, [std::strcmp](<#/doc/string/byte/strcmp>)(what(), what_arg) == 0.

3) Construtor de cópia. Se *this e other ambos tiverem o tipo dinâmico `std::format_error`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0. Nenhuma exceção pode ser lançada a partir do construtor de cópia.

### Parâmetros

- **what_arg** — string explicativa
- **other** — outro objeto de exceção para copiar

### Exceções

1,2) Pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>).

### Observações

Como a cópia de `std::format_error` não é permitida a lançar exceções, esta mensagem é tipicamente armazenada internamente como uma string com contagem de referências alocada separadamente. Esta é também a razão pela qual não existe um construtor que aceite `std::string&&`: ele teria que copiar o conteúdo de qualquer forma.

Uma classe de exceção padrão derivada deve ter um construtor de cópia publicamente acessível. Ele pode ser implicitamente definido desde que as strings explicativas obtidas por `what()` sejam as mesmas para o objeto original e o objeto copiado.

## std::format_error::operator=

format_error& operator=( const format_error& other ) noexcept;

Atribui o conteúdo com o de other. Se *this e other ambos tiverem o tipo dinâmico `std::format_error`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0 após a atribuição. Nenhuma exceção pode ser lançada a partir do operador de atribuição de cópia.

### Parâmetros

- **other** — outro objeto de exceção para atribuir

### Valor de retorno

*this

### Observações

Uma classe de exceção padrão derivada deve ter um operador de atribuição de cópia publicamente acessível. Ele pode ser implicitamente definido desde que as strings explicativas obtidas por `what()` sejam as mesmas para o objeto original e o objeto copiado.

## Herdado de [std::runtime_error](<#/doc/error/runtime_error>)

## Herdado de [std::exception](<#/doc/error/exception>)

### Funções membro

[ (destrutor)](<#/doc/error/exception/~exception>)[virtual] | destrói o objeto de exceção
(função membro pública virtual de `std::exception`)
[ what](<#/doc/error/exception/what>)[virtual] | retorna uma string explicativa
(função membro pública virtual de `std::exception`)

### Exemplo

Execute este código
```cpp
    #include <format>
    #include <print>
    #include <string_view>
    #include <utility>
    
    int main()
    {
        try
        {
            auto x13{37};
            auto args{std::make_format_args(x13)};
            std::ignore = std::vformat("{:()}", args); // throws
        }
        catch(const std::format_error& ex)
        {
            std::println("{}", ex.what());
        }
    }
```

Saída possível:
```
    format error: failed to parse format-spec
```

### Veja também