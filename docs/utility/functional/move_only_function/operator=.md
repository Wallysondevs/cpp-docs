# std::move_only_function::operator=

```cpp
move_only_function& operator=( move_only_function&& other );  // (1) (desde C++23)
move_only_function& operator=( const move_only_function& ) = delete;  // (2) (desde C++23)
move_only_function& operator=( std::nullptr_t ) noexcept;  // (3) (desde C++23)
template< class F >
move_only_function& operator=( F&& f );  // (4) (desde C++23)
```

Atribui um novo alvo a `std::move_only_function` ou destrói seu alvo.

1) Move o alvo de other para *this ou destrói o alvo de *this (se houver) se other estiver vazio, como se por `auto(std::move(other)).swap(*this)`. other fica em um estado válido com um valor não especificado após a atribuição por movimento.

2) O operador de atribuição por cópia é deletado. `std::move_only_function` não satisfaz [CopyAssignable](<#/doc/named_req/CopyAssignable>).

3) Destrói o alvo atual se ele existir. *this fica vazio após a chamada.

4) Define o alvo de *this para o callable f, ou destrói o alvo atual se f for um ponteiro de função nulo, um ponteiro nulo para função membro, ou um `std::move_only_function` vazio, como se executasse `move_only_function([std::forward](<#/doc/utility/forward>)<F>(f)).swap(*this);`. Esta sobrecarga participa da resolução de sobrecarga somente se o construtor de `move_only_function` a partir de `F` participar da resolução de sobrecarga. O programa é malformado ou tem comportamento indefinido se a chamada do construtor selecionado for malformada ou tiver comportamento indefinido.

### Parâmetros

- **other** — outro objeto `std::move_only_function` para mover o alvo
- **f** — um objeto callable para inicializar o novo alvo

### Valor de retorno

*this

### Observações

É intencional não exigir que o operador de atribuição por movimento seja noexcept para deixar espaço para um `move_only_function` ciente de alocador no futuro.

`move_only_function` pode ser atribuído a partir de [std::in_place_type](<#/doc/utility/in_place>)&lt;Fn&gt; dado que pode ser construído a partir desse argumento.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ operator=](<#/>) | atribui um novo alvo
(função membro pública de `std::function<R(Args...)>`)
---