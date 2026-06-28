# std::experimental::optional&lt;T&gt;::optional

constexpr optional() noexcept;  
constexpr optional( [std::experimental::nullopt_t](<#/doc/experimental/optional/nullopt_t>) ) noexcept; |  (1)  |  (library fundamentals TS)  
---|---|---
optional( const optional& other ); |  (2)  |  (library fundamentals TS)  
optional( optional&& other ) noexcept(/* see below */); |  (3)  |  (library fundamentals TS)  
constexpr optional( const T& value ); |  (4)  |  (library fundamentals TS)  
constexpr optional( T&& value ); |  (5)  |  (library fundamentals TS)  
template< class... Args >   
constexpr explicit optional( [std::experimental::in_place_t](<#/doc/experimental/optional/in_place_t>), Args&&... args ); |  (6)  |  (library fundamentals TS)  
template< class U, class... Args >  
constexpr explicit optional( [std::experimental::in_place_t](<#/doc/experimental/optional/in_place_t>),  
[std::initializer_list](<#/doc/utility/initializer_list>)&lt;U&gt; ilist,   
Args&&... args ); |  (7)  |  (library fundamentals TS)  

  
Constrói um novo objeto `optional`.

1) Constrói o objeto que _não contém um valor_.

2) Construtor de cópia: Se other contém um valor, inicializa o valor contido como se estivesse [inicializando diretamente](<#/doc/language/direct_initialization>) (mas não inicializando diretamente por lista) um objeto do tipo `T` com a expressão *other. Se other não contém um valor, constrói um objeto que _não contém um valor_.

3) Construtor de movimento: Se other contém um valor, inicializa o valor contido como se estivesse [inicializando diretamente](<#/doc/language/direct_initialization>) (mas não inicializando diretamente por lista) um objeto do tipo `T` com a expressão std::move(*other) e _não_ torna other vazio: um optional do qual o valor foi movido ainda _contém um valor_, mas o valor em si foi movido. Se other não contém um valor, constrói um objeto que _não contém um valor_.

4) Constrói um objeto optional que _contém um valor_, inicializado como se estivesse [inicializando diretamente](<#/doc/language/direct_initialization>) (mas não inicializando diretamente por lista) um objeto do tipo `T` com a expressão value. Este construtor é `constexpr` se o construtor de `T` selecionado pela inicialização direta for `constexpr`.

5) Constrói um objeto optional que _contém um valor_, inicializado como se estivesse [inicializando diretamente](<#/doc/language/direct_initialization>) (mas não inicializando diretamente por lista) um objeto do tipo `T` com a expressão std::move(value). Este construtor é `constexpr` se o construtor de `T` selecionado pela inicialização direta for `constexpr`.

6) Constrói um objeto optional que _contém um valor_, inicializado como se estivesse [inicializando diretamente](<#/doc/language/direct_initialization>) (mas não inicializando diretamente por lista) um objeto do tipo `T` a partir dos argumentos [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)....

7) Constrói um objeto optional que _contém um valor_, inicializado como se estivesse [inicializando diretamente](<#/doc/language/direct_initialization>) (mas não inicializando diretamente por lista) um objeto do tipo `T` a partir dos argumentos ilist, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args).... A função não participa da resolução de sobrecarga se [std::is_constructible](<#/doc/types/is_constructible>)<T, [std::initializer_list](<#/doc/utility/initializer_list>)&lt;U&gt;&, Args&&...>::value != true.

### Parâmetros

other  |  \-  |  outro objeto `optional` cujo valor contido deve ser copiado   
---|---|---
value  |  \-  |  valor para inicializar o valor contido   
args...  |  \-  |  argumentos para inicializar o valor contido   
ilist  |  \-  |  lista de inicialização para inicializar o valor contido   
Requisitos de tipo   
-`T` deve atender aos requisitos de [CopyConstructible](<#/doc/named_req/CopyConstructible>) para usar as sobrecargas (2,4).   
-`T` deve atender aos requisitos de [MoveConstructible](<#/doc/named_req/MoveConstructible>) para usar as sobrecargas (3,5).   
  
### Exceções

2) Lança qualquer exceção lançada pelo construtor de `T`.

3) Lança qualquer exceção lançada pelo construtor de `T`. Possui a seguinte declaração `noexcept`: 

Especificação `noexcept`: 

`noexcept([std::is_nothrow_move_constructible](<#/doc/types/is_move_constructible>)<T>::value)`

4-7) Lança qualquer exceção lançada pelo construtor de `T`.

### Exemplo

Execute este código
```cpp 
    #include <experimental/optional>
    #include <iostream>
    #include <string>
     
    int main()
    {
        std::experimental::optional<int> o1,      // empty
                                         o2 = 1,  // init from rvalue
                                         o3 = o2; // copy-constructor
     
        std::experimental::optional<std::string> o4(std::experimental::in_place,
                                                    {'a', 'b', 'c'});
     
        std::cout << *o2 << ' ' << *o3 << ' ' << *o4 << '\n';
    }
```

Saída: 
```
    1 1 abc
```

### Veja também

[ make_optional](<#/doc/experimental/optional/make_optional>) |  cria um objeto `optional`   
(modelo de função)  