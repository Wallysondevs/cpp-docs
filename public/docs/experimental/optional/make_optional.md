# std::experimental::make_optional

Definido no cabeçalho `[<experimental/optional>](<#/doc/header/experimental/optional>)`

```c
template< class T >
constexpr optional<typename std::decay<T>::type>
make_optional( T&& value );
```

Cria um objeto optional a partir de `value`. Efetivamente chama optional<typename [std::decay](<#/doc/types/decay>)&lt;T&gt;::type>([std::forward](<#/doc/utility/forward>)&lt;T&gt;(value)).

### Parâmetros

- **value** — o valor para construir o objeto optional com

### Valor de retorno

Um objeto optional com `value` como o valor contido.

### Exceções

Lança qualquer exceção lançada pelo construtor de `T`.

### Veja também

[ (construtor)](<#/doc/experimental/optional/optional>) | constrói o objeto optional
(função membro pública)