# std::length_error

Definido no header `[<stdexcept>](<#/doc/header/stdexcept>)`

```cpp
class length_error;
```

  
Define um tipo de objeto a ser lançado como exceção. Ele reporta erros que resultam de tentativas de exceder limites de comprimento definidos pela implementação para algum objeto.

Esta exceção é lançada por funções membro de [std::basic_string](<#/doc/string/basic_string>) e [std::vector::reserve](<#/doc/container/vector/reserve>).

Diagrama de herança

### Funções membro

(construtor) |  constrói um novo objeto `length_error` com a mensagem fornecida   
(função membro pública)  
operator= |  substitui o objeto `length_error`   
(função membro pública)  
  
##  std::length_error::length_error

```cpp
length_error( const std::string& what_arg );  // (1)
length_error( const char* what_arg );  // (2)
length_error( const length_error& other ); |  (3)  |  (noexcept desde C++11)
```

  
1) Constrói o objeto de exceção com what_arg como string explicativa. Após a construção, [std::strcmp](<#/doc/string/byte/strcmp>)(what(), what_arg.c_str()) == 0.

2) Constrói o objeto de exceção com what_arg como string explicativa. Após a construção, [std::strcmp](<#/doc/string/byte/strcmp>)(what(), what_arg) == 0.

3) Construtor de cópia. Se *this e other ambos tiverem o tipo dinâmico `std::length_error`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0. Nenhuma exceção pode ser lançada a partir do construtor de cópia.

###  Parâmetros

what_arg  |  \-  |  string explicativa   
---|---|---
other  |  \-  |  outro objeto de exceção para copiar   
  
###  Exceções

1,2) Pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>).

###  Notas

Como a cópia de `std::length_error` não é permitida a lançar exceções, esta mensagem é tipicamente armazenada internamente como uma string com contagem de referência alocada separadamente. Esta é também a razão pela qual não há um construtor que aceite `std::string&&`: ele teria que copiar o conteúdo de qualquer forma.

Antes da resolução do [LWG issue 254](<https://cplusplus.github.io/LWG/issue254>), o construtor não-cópia só podia aceitar [std::string](<#/doc/string/basic_string>). Isso tornava a alocação dinâmica obrigatória para construir um objeto [std::string](<#/doc/string/basic_string>).

Após a resolução do [LWG issue 471](<https://cplusplus.github.io/LWG/issue471>), uma classe de exceção padrão derivada deve ter um construtor de cópia publicamente acessível. Ele pode ser implicitamente definido desde que as strings explicativas obtidas por `what()` sejam as mesmas para o objeto original e o objeto copiado.

##  std::length_error::operator=

length_error& operator=( const length_error& other ); |  |  (noexcept desde C++11)  

  
Atribui o conteúdo com o de other. Se *this e other ambos tiverem o tipo dinâmico `std::length_error`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0 após a atribuição. Nenhuma exceção pode ser lançada a partir do operador de atribuição de cópia.

###  Parâmetros

other  |  \-  |  outro objeto de exceção para atribuir   
  
###  Valor de retorno

*this

###  Notas

Após a resolução do [LWG issue 471](<https://cplusplus.github.io/LWG/issue471>), uma classe de exceção padrão derivada deve ter um operador de atribuição de cópia publicamente acessível. Ele pode ser implicitamente definido desde que as strings explicativas obtidas por `what()` sejam as mesmas para o objeto original e o objeto copiado.

##  Herdado de [std::logic_error](<#/doc/error/logic_error>)

##  Herdado de [std::exception](<#/doc/error/exception>)

###  Funções membro

[ (destrutor)](<#/doc/error/exception/~exception>)[virtual] |  destrói o objeto de exceção   
(função membro pública virtual de `std::exception`)  
[ what](<#/doc/error/exception/what>)[virtual] |  retorna uma string explicativa   
(função membro pública virtual de `std::exception`)  
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 254](<https://cplusplus.github.io/LWG/issue254>) | C++98  | o construtor que aceita const char* estava faltando  | adicionado   
[LWG 471](<https://cplusplus.github.io/LWG/issue471>) | C++98  | as strings explicativas das cópias de `std::length_error` eram definidas pela implementação  | elas são as mesmas do objeto `std::length_error` original   
  
### Veja também

[ resize](<#/doc/string/basic_string/resize>) |  altera o número de caracteres armazenados   
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)  