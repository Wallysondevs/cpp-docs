# std::experimental::optional&lt;T&gt;::operator=

optional& operator=( [std::experimental::nullopt_t](<#/doc/experimental/optional/nullopt_t>) ) noexcept; |  (1)  |  (TS de Fundamentos da Biblioteca)  
---|---|---
optional& operator=( const optional& other ); |  (2)  |  (TS de Fundamentos da Biblioteca)  
optional& operator=( optional&& other ) noexcept(/* see below */); |  (3)  |  (TS de Fundamentos da Biblioteca)  
template< class U >   
optional& operator=( U&& value ); |  (4)  |  (TS de Fundamentos da Biblioteca)  

  
Substitui o conteúdo de *this pelo conteúdo de other.

1) Se *this contiver um valor antes da chamada, o valor contido é destruído chamando seu destrutor como se fosse por val->T::~T(). *this não contém um valor após esta chamada.

2,3) Atribui o estado de other.  

  * Se tanto *this quanto other não contiverem um valor, a função não tem efeito. 
  * Se *this contiver um valor, mas other não, então o valor contido é destruído chamando seu destrutor. *this não contém um valor após a chamada. 
  * Se other contiver um valor, então, dependendo se *this contiver um valor, o valor contido é [inicializado diretamente](<#/doc/language/direct_initialization>) ou atribuído a partir de *other (2) ou std::move(*other) (3). Note que um optional movido-de ainda _contém um valor_.

4) Atribuição com perfect-forwarding apenas para decaimento: dependendo se *this contém um valor antes da chamada, o valor contido é [inicializado diretamente](<#/doc/language/direct_initialization>) a partir de [std::forward](<#/doc/utility/forward>)&lt;U&gt;(value) ou atribuído a partir de [std::forward](<#/doc/utility/forward>)&lt;U&gt;(value). A função não participa da resolução de sobrecarga a menos que [std::is_same](<#/doc/types/is_same>)<[std::decay_t](<#/doc/types/decay>)&lt;U&gt;, T>::value seja true.

### Parâmetros

other  |  \-  |  outro objeto `optional` cujo valor contido deve ser atribuído   
---|---|---
value  |  \-  |  valor a ser atribuído ao valor contido   
Requisitos de tipo   
-`T` deve atender aos requisitos de [CopyAssignable](<#/doc/named_req/CopyAssignable>) e [CopyConstructible](<#/doc/named_req/CopyConstructible>) para usar a sobrecarga (2).   
-`T` deve atender aos requisitos de [MoveAssignable](<#/doc/named_req/MoveAssignable>) e [MoveConstructible](<#/doc/named_req/MoveConstructible>) para usar a sobrecarga (3).   
  
### Valor de retorno

*this

### Exceções

2-4) Lança qualquer exceção lançada pelo construtor ou operador de atribuição de `T`. Se uma exceção for lançada, o estado de inicialização de *this (e de other no caso de (2)) permanece inalterado, ou seja, se o objeto continha um valor, ele ainda contém um valor, e vice-versa. O conteúdo de value e os valores contidos de *this e other dependem das garantias de segurança de exceção da operação da qual a exceção se origina (construtor de cópia, atribuição por movimento, etc.).  
(3) possui a seguinte declaração `noexcept`: 

Especificação `noexcept`: 

noexcept([std::is_nothrow_move_assignable](<#/doc/types/is_move_assignable>)&lt;T&gt;::value && [std::is_nothrow_move_constructible](<#/doc/types/is_move_constructible>)&lt;T&gt;::value)

### Notas

Um objeto optional `op` pode ser transformado em um optional vazio com ambos op = {}; e op = nullopt;. 

### Exemplo

Execute este código
```cpp
    #include <experimental/optional>
    #include <iostream>
     
    int main()
    {
        std::experimental::optional<const char*> s1 = "abc", s2; // constructor
        s2 = s1; // assignment
        s1 = "def"; // decaying assignment (U = char[4], T = const char*)
        std::cout << *s2 << ' ' << *s1 << '\n';
    }
```

Saída: 
```
    abc def
```

### Ver também

[ emplace](<#/doc/experimental/optional/emplace>) | constrói o valor contido no local   
(função membro pública)  