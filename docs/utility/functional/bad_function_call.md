# std::bad_function_call

Definida no cabeçalho `[<functional>](<#/doc/header/functional>)`
class bad_function_call;

  
`std::bad_function_call` é o tipo da exceção lançada por [`std::function::operator()`](<#/>) se o wrapper de função não tiver um alvo. 

Diagrama de herança

### Funções membro

(construtor) |  constrói um novo objeto `bad_function_call`   
(função membro pública)  
operator= |  substitui o objeto `bad_function_call`   
(função membro pública)  
what |  retorna a string explicativa   
(função membro pública)  
  
##  std::bad_function_call::bad_function_call

```cpp
bad_function_call() noexcept;  // (1) (desde C++11)
bad_function_call( const bad_function_call& other ) noexcept;  // (2) (desde C++11)
```

  
Constrói um novo objeto `bad_function_call` com uma string de bytes terminada em nulo definida pela implementação, que é acessível através de [`what()`](<#/doc/error/exception/what>). 

1) Construtor padrão.

2) Construtor de cópia. Se *this e other ambos tiverem o tipo dinâmico `std::bad_function_call`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0.

###  Parâmetros

other  |  \-  |  outro objeto de exceção para copiar   
  
##  std::bad_function_call::operator=

```cpp
bad_function_call& operator=( const bad_function_call& other ) noexcept;  // (desde C++11)
```

  
Atribui o conteúdo com o de other. Se *this e other ambos tiverem o tipo dinâmico `std::bad_function_call`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0 após a atribuição. 

###  Parâmetros

other  |  \-  |  outro objeto de exceção para atribuir   
  
###  Valor de retorno

*this

##  std::bad_function_call::what

```cpp
virtual const char* what() const noexcept;  // (desde C++11)
```

  
Retorna a string explicativa. 

###  Valor de retorno

Ponteiro para uma string terminada em nulo definida pela implementação com informações explicativas. A string é adequada para conversão e exibição como uma [std::wstring](<#/doc/string/basic_string>). O ponteiro é garantido como válido pelo menos até que o objeto de exceção do qual ele é obtido seja destruído, ou até que uma função membro não-const (por exemplo, operador de atribuição de cópia) no objeto de exceção seja chamada. 

A string retornada é codificada com a codificação literal ordinária durante a avaliação em tempo de compilação.  | (desde C++26)  
  
###  Notas

As implementações são permitidas, mas não obrigadas, a sobrescrever `what()`. 

##  Herdado de [std::exception](<#/doc/error/exception>)

###  Funções membro

[ (destructor)](<#/doc/error/exception/~exception>)[virtual] |  destrói o objeto de exceção   
(função membro pública virtual de `std::exception`)  
[ what](<#/doc/error/exception/what>)[virtual] |  retorna uma string explicativa   
(função membro pública virtual de `std::exception`)  
  
### Exemplo

Execute este código
```cpp
    #include <functional>
    #include <iostream>
     
    int main()
    {
        std::function<int()> f = nullptr;
        try
        {
            f();
        }
        catch (const std::bad_function_call& e)
        {
            std::cout << e.what() << '\n';
        }
    }
```

Saída possível: 
```
    bad function call
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2233](<https://cplusplus.github.io/LWG/issue2233>) | C++11  | `what()` sempre retornava a mesma string explicativa que [`std::exception::what()`](<#/doc/error/exception/what>) | retorna sua própria string explicativa   
  
### Veja também

[ function](<#/doc/utility/functional/function>)(C++11) |  wrapper copiável de qualquer objeto chamável copiável   
(modelo de classe)  