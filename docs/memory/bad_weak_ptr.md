# std::bad_weak_ptr

Definido no header `[<memory>](<#/doc/header/memory>)`

```cpp
class bad_weak_ptr;  // (desde C++11)
```

  
`std::bad_weak_ptr` é o tipo do objeto lançado como exceção pelos construtores de [std::shared_ptr](<#/doc/memory/shared_ptr>) que recebem [std::weak_ptr](<#/doc/memory/weak_ptr>) como argumento, quando o [std::weak_ptr](<#/doc/memory/weak_ptr>) se refere a um objeto já deletado. 

Diagrama de herança

### Funções membro

(construtor) |  constrói um novo objeto `bad_weak_ptr`   
(função membro pública)  
operator= |  substitui o objeto `bad_weak_ptr`   
(função membro pública)  
what |  retorna a string explicativa   
(função membro pública)  
  
##  std::bad_weak_ptr::bad_weak_ptr

```cpp
bad_weak_ptr() noexcept;  // (1) (desde C++11)
bad_weak_ptr( const bad_weak_ptr& other ) noexcept;  // (2) (desde C++11)
```

  
Constrói um novo objeto `bad_weak_ptr` com uma string de bytes terminada em nulo definida pela implementação, que é acessível através de [`what()`](<#/doc/error/exception/what>). 

1) Construtor padrão.

2) Construtor de cópia. Se *this e other ambos tiverem o tipo dinâmico `std::bad_weak_ptr`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0.

###  Parâmetros

other  |  \-  |  outro objeto de exceção para copiar   
  
##  std::bad_weak_ptr::operator=

```cpp
bad_weak_ptr& operator=( const bad_weak_ptr& other ) noexcept;  // (desde C++11)
```

  
Atribui o conteúdo com o de other. Se *this e other ambos tiverem o tipo dinâmico `std::bad_weak_ptr`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0 após a atribuição. 

###  Parâmetros

other  |  \-  |  outro objeto de exceção para atribuir   
  
###  Valor de retorno

*this

##  std::bad_weak_ptr::what

```cpp
virtual const char* what() const noexcept;  // (desde C++11)
```

  
Retorna a string explicativa. 

###  Valor de retorno

Ponteiro para uma string terminada em nulo definida pela implementação com informações explicativas. A string é adequada para conversão e exibição como uma [std::wstring](<#/doc/string/basic_string>). O ponteiro é garantido como válido pelo menos até que o objeto de exceção do qual ele é obtido seja destruído, ou até que uma função membro não-const (por exemplo, operador de atribuição de cópia) no objeto de exceção seja chamada. 

A string retornada é codificada com a codificação literal ordinária durante a avaliação constante.  | (desde C++26)  
  
###  Notas

As implementações são permitidas, mas não obrigadas, a sobrescrever `what()`. 

##  Herdado de [std::exception](<#/doc/error/exception>)

###  Funções membro

[ (destrutor)](<#/doc/error/exception/~exception>)[virtual] |  destrói o objeto de exceção   
(função membro pública virtual de `std::exception`)  
[ what](<#/doc/error/exception/what>)[virtual] |  retorna uma string explicativa   
(função membro pública virtual de `std::exception`)  
  
### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    
    int main()
    {
        std::shared_ptr<int> p1(new int(42));
        std::weak_ptr<int> wp(p1);
        p1.reset();
        try
        {
            std::shared_ptr<int> p2(wp);
        }
        catch (const std::bad_weak_ptr& e)
        {
            std::cout << e.what() << '\n';
        }
    }
```

Saída possível: 
```
    std::bad_weak_ptr
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
---|---|---|---
[LWG 2376](<https://cplusplus.github.io/LWG/issue2376>) | C++11  | chamar `what` em um `bad_weak_ptr` construído por padrão era exigido para retornar "bad_weak_ptr" | o valor de retorno é definido pela implementação   
  
### Veja também

[ shared_ptr](<#/doc/memory/shared_ptr>)(C++11) |  ponteiro inteligente com semântica de propriedade de objeto compartilhada   
(modelo de classe)  
[ weak_ptr](<#/doc/memory/weak_ptr>)(C++11) |  referência fraca a um objeto gerenciado por [std::shared_ptr](<#/doc/memory/shared_ptr>)   
(modelo de classe)