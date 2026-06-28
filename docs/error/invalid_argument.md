# std::invalid_argument

Definido no cabeçalho `[<stdexcept>](<#/doc/header/stdexcept>)`

```c
class invalid_argument;
```

Define um tipo de objeto a ser lançado como exceção. Ele reporta erros que surgem porque um valor de argumento não foi aceito.

Esta exceção é lançada por [std::bitset::bitset](<#/doc/utility/bitset/bitset>), e pelas famílias de funções [std::stoi](<#/doc/string/basic_string/stol>) e [std::stof](<#/doc/string/basic_string/stof>).

Diagrama de herança

### Funções membro

(construtor) | constrói um novo objeto `invalid_argument` com a mensagem fornecida
(função membro pública)
operator= | substitui o objeto `invalid_argument`
(função membro pública)

## std::invalid_argument::invalid_argument

```cpp
invalid_argument( const std::string& what_arg );  // (1)
invalid_argument( const char* what_arg );  // (2)
invalid_argument( const invalid_argument& other ); | (3) | (noexcept desde C++11)
```

1) Constrói o objeto de exceção com what_arg como string explicativa. Após a construção, [std::strcmp](<#/doc/string/byte/strcmp>)(what(), what_arg.c_str()) == 0.

2) Constrói o objeto de exceção com what_arg como string explicativa. Após a construção, [std::strcmp](<#/doc/string/byte/strcmp>)(what(), what_arg) == 0.

3) Construtor de cópia. Se *this e other ambos tiverem o tipo dinâmico `std::invalid_argument`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0. Nenhuma exceção pode ser lançada a partir do construtor de cópia.

### Parâmetros

- **what_arg** — string explicativa
- **other** — outro objeto de exceção para copiar

### Exceções

1,2) Pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>).

### Notas

Como a cópia de `std::invalid_argument` não é permitida a lançar exceções, esta mensagem é tipicamente armazenada internamente como uma string com contagem de referências alocada separadamente. É também por isso que não há um construtor que aceite `std::string&&`: ele teria que copiar o conteúdo de qualquer forma.

Antes da resolução do [LWG issue 254](<https://cplusplus.github.io/LWG/issue254>), o construtor não-cópia só podia aceitar [std::string](<#/doc/string/basic_string>). Isso tornava a alocação dinâmica obrigatória para construir um objeto [std::string](<#/doc/string/basic_string>).

Após a resolução do [LWG issue 471](<https://cplusplus.github.io/LWG/issue471>), uma classe de exceção padrão derivada deve ter um construtor de cópia publicamente acessível. Ele pode ser implicitamente definido desde que as strings explicativas obtidas por `what()` sejam as mesmas para o objeto original e o objeto copiado.

## std::invalid_argument::operator=

invalid_argument& operator=( const invalid_argument& other ); | | (noexcept desde C++11)

Atribui o conteúdo com o de other. Se *this e other ambos tiverem o tipo dinâmico `std::invalid_argument`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0 após a atribuição. Nenhuma exceção pode ser lançada a partir do operador de atribuição de cópia.

### Parâmetros

- **other** — outro objeto de exceção para atribuir

### Valor de retorno

*this

### Notas

Após a resolução do [LWG issue 471](<https://cplusplus.github.io/LWG/issue471>), uma classe de exceção padrão derivada deve ter um operador de atribuição de cópia publicamente acessível. Ele pode ser implicitamente definido desde que as strings explicativas obtidas por `what()` sejam as mesmas para o objeto original e o objeto copiado.

## Herdado de [std::logic_error](<#/doc/error/logic_error>)

## Herdado de [std::exception](<#/doc/error/exception>)

### Funções membro

[ (destrutor)](<#/doc/error/exception/~exception>)[virtual] | destrói o objeto de exceção
(função membro pública virtual de `std::exception`)
[ what](<#/doc/error/exception/what>)[virtual] | retorna uma string explicativa
(função membro pública virtual de `std::exception`)

### Notas

O propósito deste tipo de exceção é similar à condição de erro [std::errc::invalid_argument](<#/doc/error/errc>) (lançada em [std::system_error](<#/doc/error/system_error>) a partir de funções membro de [std::thread](<#/doc/thread/thread>)) e à constante errno relacionada [EINVAL](<#/doc/error/errno_macros>).

### Exemplo

Execute este código
```cpp
    #include <bitset>
    #include <iostream>
    #include <stdexcept>
    #include <string>
    
    int main()
    {
        try
        {
            [std::bitset]<4>{"012"}; // Throws: only '0' or '1' expected
        }
        catch (std::invalid_argument const& ex)
        {
            [std::cout] << "#1: " << ex.what() << '\n';
        }
    
        try
        {
            [[maybe_unused]] int f = std::stoi; // Throws: no conversion
        }
        catch (std::invalid_argument const& ex)
        {
            [std::cout] << "#2: " << ex.what() << '\n';
        }
    
        try
        {
            [[maybe_unused]] float f = [std::stof]>("(3.14)"); // Throws: no conversion
        }
        catch (std::invalid_argument const& ex)
        {
            [std::cout] << "#3: " << ex.what() << '\n';
        }
    }
```

Saída possível:
```
    #1: bitset string ctor has invalid argument
    #2: stoi: no conversion
    #3: stof: no conversion
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 254](<https://cplusplus.github.io/LWG/issue254>) | C++98 | o construtor que aceita const char* estava faltando | adicionado
[LWG 471](<https://cplusplus.github.io/LWG/issue471>) | C++98 | as strings explicativas das cópias de `std::invalid_argument` eram definidas pela implementação | elas são as mesmas do objeto `std::invalid_argument` original