# std::logical_not

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class T >
struct logical_not;
template< class T = void >
struct logical_not;
```

  
Objeto de função para realizar NOT lógico (negação lógica). Efetivamente chama operator! para o tipo `T`. 

### Especializações

A standard library fornece uma especialização de `std::logical_not` quando `T` não é especificado, o que permite que os tipos de parâmetro e o tipo de retorno sejam deduzidos.  |  [ logical_not&lt;void&gt;](<#/doc/utility/functional/logical_not_void>)(C++14) |  objeto de função que implementa !x deduzindo tipos de parâmetro e retorno   
(especialização de template de classe)  
(desde C++14)  
  
### Tipos de membros

Tipo  |  Definição   
---|---
`result_type` (obsoleto em C++17)(removido em C++20) |  bool  
`argument_type` (obsoleto em C++17)(removido em C++20) |  `T`  
Esses tipos de membros são obtidos através da herança pública de [std::unary_function](<#/doc/utility/functional/unary_function>)<T, bool>.  | (até C++11)  
  
### Funções de membro

operator() |  retorna o NOT lógico do argumento   
(função de membro pública)  
  
##  std::logical_not::operator()

bool operator()( const T& arg ) const; |  | (constexpr desde C++14)  

  
Retorna o NOT lógico de arg. 

###  Parâmetros

arg  |  \-  |  valor para calcular o NOT lógico   
  
###  Valor de retorno

O resultado de !arg. 

### Exceções

Pode lançar exceções definidas pela implementação. 

###  Possível implementação
```cpp
    constexpr // since C++14
    bool operator()(const T& arg) const 
    {
        return !arg;
    }
```  
  
---