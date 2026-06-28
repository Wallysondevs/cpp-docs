# std::vector&lt;bool, Alloc&gt;::reference

class reference;

  
As especializações de [`std::vector`](<#/doc/container/vector_bool>)<bool, Alloc> definem [`std::vector`](<#/doc/container/vector_bool>)<bool, Alloc>::reference como uma classe aninhada publicamente acessível. [`std::vector`](<#/doc/container/vector_bool>)<bool, Alloc>::reference atua como um proxy para o comportamento de referências a um único bit em [`std::vector`](<#/doc/container/vector_bool>)<bool, Alloc>. 

O uso principal de [`std::vector`](<#/doc/container/vector_bool>)<bool, Alloc>::reference é fornecer um lvalue que pode ser retornado de operator[]. 

Quaisquer leituras ou escritas em um vector que ocorram via um [`std::vector`](<#/doc/container/vector_bool>)<bool, Alloc>::reference podem potencialmente ler ou escrever em todo o vector subjacente. 

### Funções membro

(construtor) |  constrói a referência. Não há construtor padrão. O construtor de cópia é implicitamente declarado (até C++11) padronizado (desde C++11). Pode haver um construtor interno que é acessível apenas ao próprio [`std::vector`](<#/doc/container/vector_bool>)<bool, Alloc>.   
(função membro pública)  
(destrutor) |  destrói a referência   
(função membro pública)  
operator= |  atribui um bool ao bit referenciado   
(função membro pública)  
** operator bool** |  retorna o bit referenciado   
(função membro pública)  
flip |  inverte o bit referenciado   
(função membro pública)  
  
##  std::vector<bool, Alloc>::reference::~reference

```cpp
~reference();  // (até C++20)
constexpr ~reference();  // (desde C++20)
```

  
Destrói a referência. 

##  std::vector<bool, Alloc>::reference::operator=

```cpp
  // (1)
reference& operator=( bool x );  // (até C++11)
reference& operator=( bool x ) noexcept;  // (desde C++11)
(até C++20)
constexpr reference& operator=( bool x ) noexcept;  // (desde C++20)
  // (2)
reference& operator=( const reference& x );  // (até C++11)
reference& operator=( const reference& x ) noexcept;  // (desde C++11)
(até C++20)
constexpr reference& operator=( const reference& x ) noexcept;  // (desde C++20)
constexpr const reference& operator=( bool x ) const noexcept;  // (3) (desde C++23)
```

  
Atribui um valor ao bit referenciado. 

###  Parâmetros

x  |  \-  |  valor a atribuir   
  
###  Valor de retorno

*this

##  std::vector<bool, Alloc>::reference::operator bool

```cpp
operator bool() const;  // (até C++11)
operator bool() const noexcept;  // (desde C++11)
(até C++20)
constexpr operator bool() const noexcept;  // (desde C++20)
```

  
Retorna o valor do bit referenciado. 

###  Parâmetros

(nenhum) 

###  Valor de retorno

O bit referenciado. 

##  std::vector<bool, Alloc>::reference::flip

```cpp
void flip();  // (até C++11)
void flip() noexcept;  // (desde C++11)
(até C++20)
constexpr void flip() noexcept;  // (desde C++20)
```

  
Inverte o bit referenciado. 

###  Parâmetros

(nenhum) 

###  Valor de retorno

(nenhum) 

### Classes auxiliares

##  std::formatter<std::vector<bool, Alloc>::reference>

```cpp
template< class T, class CharT >
requires /*is-vector-bool-reference*/<T>
struct formatter<T, CharT>;  // (desde C++23)
```

  
Especializa o [std::formatter](<#/doc/utility/format/formatter>) para `std::vector`<bool, Alloc>::reference. A especialização usa [std::formatter](<#/doc/utility/format/formatter>)<bool, CharT> como seu formatador subjacente (denotado como `_underlying__`) onde o bit referenciado é convertido para bool para ser formatado. 

A constante apenas para exposição /*is-vector-bool-reference*/&lt;T&gt; é verdadeira se e somente se `T` denota o tipo `std::vector`<bool, Alloc>::reference para algum tipo `Alloc` e `std::vector`<bool, Alloc> não é uma [especialização definida pelo programa](<#/doc/language/type-id>). 

####  Funções membro

```cpp
template< class ParseContext >
constexpr ParseContext::iterator parse( ParseContext& ctx );  // (1) (desde C++23)
template< class FormatContext >
FormatContext::iterator format( const T& r, FormatContext& ctx ) const;  // (2) (desde C++23)
```

  
1) Equivalente a return` ` _underlying__`.parse(ctx);.

2) Equivalente a return` ` _underlying__`.format(r, ctx);. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ operator[]](<#/doc/container/vector/operator_at>) |  acessa o elemento especificado   
(função membro pública de `std::vector<T,Allocator>`)  
[ swap](<#/doc/container/vector_bool/swap>)[static] |  troca duas `std::vector<bool>::`reference` s**   
(função membro estática pública)  
  
### Links externos

"Effective Modern C++" by Scott Meyers (2015), Chapter 2, Item 6: "Use the explicitly typed initializer idiom when auto deduces undesired types." (p.43-46) — descreve um possível uso indevido da classe proxy [`std::vector<bool>::reference`](<#/doc/container/vector_bool/reference>)).   
---