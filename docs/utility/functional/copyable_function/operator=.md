# std::copyable_function::operator=

```cpp
copyable_function& operator=( const copyable_function& other );  // (1) (desde C++26)
copyable_function& operator=( copyable_function&& other );  // (2) (desde C++26)
copyable_function& operator=( std::nullptr_t ) noexcept;  // (3) (desde C++26)
template< class F >
copyable_function& operator=( F&& f );  // (4) (desde C++26)
```

  
Atribui um novo alvo a `std::copyable_function` ou destrói seu alvo.

1) Atribui uma cópia do alvo de other a *this como se executasse auto(other).swap(*this).

2) Move o alvo de other para *this ou destrói o alvo de *this (se houver) se other estiver vazio, por auto(std::move(other)).swap(*this). other fica em um estado válido com um valor não especificado após a atribuição por movimento.

3) Destrói o alvo atual se ele existir. *this fica vazio após a chamada.

4) Define o alvo de *this para o callable f, ou destrói o alvo atual se f for um ponteiro de função nulo, um ponteiro nulo para função membro, ou um `std::copyable_function` vazio, como se executasse copyable_function([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f)).swap(*this);. Esta sobrecarga participa da resolução de sobrecarga apenas se o construtor de `copyable_function` a partir de `F` participar da resolução de sobrecarga. O programa é malformado ou tem comportamento indefinido se a chamada do construtor selecionado for malformada ou tiver comportamento indefinido.

### Parâmetros

other  |  \-  |  outro objeto `std::copyable_function` para copiar ou mover o alvo de   
---|---|---
f  |  \-  |  um objeto callable para inicializar o novo alvo   
  
### Valor de retorno

*this

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator=](<#/>) |  atribui um novo alvo   
(função membro pública de `std::function<R(Args...)>`)  
[ operator=](<#/>) |  substitui ou destrói o alvo   
(função membro pública de `std::move_only_function`)  
---