# std::experimental::optional&lt;T&gt;::emplace

template< class... Args >   
void emplace( Args&&... args ); |  |  (library fundamentals TS)  
template< class U, class... Args >   
void emplace( [std::initializer_list](<#/doc/utility/initializer_list>)&lt;U&gt; ilist, Args&&... args ); |  |  (library fundamentals TS)  

  
Constrói o valor contido no local. Se *this já contiver um valor antes da chamada, o valor contido é destruído chamando seu destrutor.

1) Inicializa o valor contido por [inicialização direta](<#/doc/language/direct_initialization>) (mas não inicialização direta por lista) com [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)... como parâmetros.

2) Inicializa o valor contido chamando seu construtor com ilist, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)... como parâmetros. Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_constructible](<#/doc/types/is_constructible>)<T, [std::initializer_list](<#/doc/utility/initializer_list>)&lt;U&gt;&, Args&&...>::value for verdadeiro.

### Parâmetros

args...  |  \-  |  os argumentos a serem passados para o construtor   
---|---|---
ilist  |  \-  |  a initializer list a ser passada para o construtor   
Requisitos de tipo   
-`T` deve ser construtível a partir de `Args...`  
-`T` deve ser construtível a partir de [std::initializer_list](<#/doc/utility/initializer_list>) e `Args...`  
  
### Valor de retorno

(nenhum) 

### Exceções

Qualquer exceção lançada pelo construtor selecionado de `T`. Se uma exceção for lançada, *this não conterá um valor após esta chamada (o valor previamente contido, se houver, já terá sido destruído). 

### Veja também

[ operator=](<#/>) |  atribui conteúdo   
(função membro pública)  