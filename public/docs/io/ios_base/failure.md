# std::ios_base::failure

Definida no header `[<ios>](<#/doc/header/ios>)`
class failure;

A classe `std::ios_base::failure` define um objeto de exceção que é lançado em caso de falha pelas funções da biblioteca de Entrada/Saída.

`std::ios_base::failure` pode ser definida tanto como uma classe membro de [std::ios_base](<#/doc/io/ios_base>) quanto como um sinônimo (typedef) para outra classe com funcionalidade equivalente. | (desde C++17)
---|---
Diagrama de herança | (ate C++11)
Diagrama de herança | (desde C++11)

### Funções membro

(construtor) | constrói um novo objeto `failure` com a mensagem fornecida
(função membro pública)
operator= | substitui o objeto `failure`
(função membro pública)
what | retorna a string explicativa
(função membro pública)

## std::ios_base::failure::failure

```cpp
  // (1)
explicit failure( const std::string& message ); | | (ate C++11)
explicit failure( const std::string& message,
const std::error_code& ec = std::io_errc::stream );  // (desde C++11)
explicit failure( const char* message,
const std::error_code& ec = std::io_errc::stream );  // (2) (desde C++11)
  // (3)
failure( const failure& other ); | | (ate C++11)
failure( const failure& other ) noexcept;  // (desde C++11)
```

1,2) Constrói o objeto de exceção usando `message` como string de explicação, que pode ser recuperada posteriormente usando [`what()`](<#/doc/error/exception/what>). `ec` é usado para identificar a razão específica da falha.(desde C++11)

3) Construtor de cópia. Inicializa o conteúdo com o de `other`. Se `*this` e `other` ambos tiverem o tipo dinâmico `std::ios_base::failure`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0.(desde C++11)

### Parâmetros

- **message** — string explicativa
- **ec** — código de erro para identificar a razão específica da falha
- **other** — outro `failure` para copiar

### Notas

Como a cópia de `std::ios_base::failure` não é permitida a lançar exceções, esta mensagem é tipicamente armazenada internamente como uma string com contagem de referência alocada separadamente. Esta é também a razão pela qual não há construtor que aceite [std::string](<#/doc/string/basic_string>)&&: ele teria que copiar o conteúdo de qualquer forma.

## std::ios_base::failure::operator=

```cpp
failure& operator=( const failure& other ); | | (ate C++11)
failure& operator=( const failure& other ) noexcept;  // (desde C++11)
```

Atribui o conteúdo com o de `other`. Se `*this` e `other` ambos tiverem o tipo dinâmico `std::ios_base::failure`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0 após a atribuição.(desde C++11)

### Parâmetros

- **other** — outro objeto de exceção para atribuir

### Valor de retorno

`*this`

## std::ios_base::failure::what

```cpp
virtual const char* what() const throw(); | | (ate C++11)
virtual const char* what() const noexcept;  // (desde C++11)
```

Retorna a string explicativa.

### Valor de retorno

Ponteiro para uma string terminada em nulo, definida pela implementação, com informações explicativas. A string é adequada para conversão e exibição como uma [std::wstring](<#/doc/string/basic_string>). O ponteiro é garantido como válido pelo menos até que o objeto de exceção do qual ele é obtido seja destruído, ou até que uma função membro não-const (por exemplo, operador de atribuição de cópia) no objeto de exceção seja chamada.

A string retornada é codificada com a codificação literal comum durante a avaliação em tempo de compilação. | (desde C++26)

### Notas

As implementações são permitidas, mas não obrigadas, a sobrescrever `what()`.

## Herdado de [std::system_error](<#/doc/error/system_error>)

### Funções membro

[ code](<#/doc/error/system_error/code>) | retorna o código de erro
(função membro pública de `std::system_error`)
[ what](<#/doc/error/system_error/what>)[virtual] | retorna uma string explicativa
(função membro pública virtual de `std::system_error`)

## Herdado de [std::runtime_error](<#/doc/error/runtime_error>)

## Herdado de [std::exception](<#/doc/error/exception>)

### Funções membro

[ (destrutor)](<#/doc/error/exception/~exception>)[virtual] | destrói o objeto de exceção
(função membro pública virtual de `std::exception`)
[ what](<#/doc/error/exception/what>)[virtual] | retorna uma string explicativa
(função membro pública virtual de `std::exception`)

### Notas

Antes da resolução do [LWG issue 331](<https://cplusplus.github.io/LWG/issue331>), `std::ios_base::failure` declarava um destrutor sem `throw()`, enquanto [`std::exception::~exception()`](<#/doc/error/exception/~exception>) era declarado com `throw()`[1](<#/doc/io/ios_base/failure>). Isso significa que `std::ios_base::failure::~failure()` tinha uma especificação de exceção mais fraca. A resolução é remover essa declaração para que a especificação de exceção que não lança seja mantida.

[LWG issue 363](<https://cplusplus.github.io/LWG/issue363>) visa o mesmo defeito e sua resolução é adicionar `throw()` à declaração de `std::ios_base::failure::~failure()`. Essa resolução não foi aplicada devido ao conflito entre as duas resoluções.

1. ↑ A especificação de exceção que não lança é agora aplicada [globalmente em toda a standard library](<#/doc/standard_library>), de modo que os destrutores das classes da standard library não são declarados com `throw()` ou `noexcept`.

### Exemplo

Execute este código
```cpp
    #include <fstream>
    #include <iostream>
     
    int main()
    {
        std::ifstream f("doesn't exist");
     
        try
        {
            f.exceptions(f.failbit);
        }
        catch (const std::ios_base::failure& e)
        {
            std::cout << "Caught an ios_base::failure.\n"
                      << "Explanatory string: " << e.what() << '\n'
                      << "Error code: " << e.code() << '\n';
        }
    }
```

Saída possível:
```
    Caught an ios_base::failure.
    Explanatory string: ios_base::clear: unspecified iostream_category error
    Error code: iostream:1
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 48](<https://cplusplus.github.io/LWG/issue48>) | C++98 | a sobrecarga do construtor (1) inicializava a classe base [std::exception](<#/doc/error/exception>) com `msg`, mas a classe base não possui um construtor correspondente | descrição correspondente removida
[LWG 331](<https://cplusplus.github.io/LWG/issue331>) | C++98 | `std::ios_base::failure` declarava um destrutor sem `throw()` | removida a declaração do destrutor

### Veja também

[ io_errc](<#/doc/io/io_errc>)(C++11) | os códigos de erro de stream de E/S
(enum)