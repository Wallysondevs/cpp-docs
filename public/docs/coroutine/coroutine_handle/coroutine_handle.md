# std::coroutine_handle&lt;Promise&gt;::coroutine_handle

```cpp
constexpr coroutine_handle() noexcept;  // (1) (desde C++20)
constexpr coroutine_handle( std::nullptr_t ) noexcept;  // (2) (desde C++20)
coroutine_handle( const coroutine_handle& other ) = default;  // (3) (desde C++20)
coroutine_handle( coroutine_handle&& other ) = default;  // (4) (desde C++20)
```

Cria um `coroutine_handle` que não referencia uma corrotina, ou copia um `coroutine_handle`.

1,2) Inicializa o endereço subjacente [`_ptr_`](<#/doc/coroutine/coroutine_handle>) para nullptr. Após a construção, [`address()`](<#/doc/coroutine/coroutine_handle/address>) retorna nullptr, e o `coroutine_handle` não referencia uma corrotina. Esses construtores não são declarados para a especialização [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)<[std::noop_coroutine_promise](<#/doc/coroutine/noop_coroutine_promise>)>.

3,4) Copia o endereço subjacente. O construtor de cópia e o construtor de movimento são equivalentes aos declarados implicitamente.

### Parâmetros

- **other** — outro `coroutine_handle` para copiar

### Notas

[std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)<[std::noop_coroutine_promise](<#/doc/coroutine/noop_coroutine_promise>)> não é nem construtível por padrão nem construtível a partir de [std::nullptr_t](<#/doc/types/nullptr_t>). [std::noop_coroutine](<#/doc/coroutine/noop_coroutine>) pode ser usado para criar um novo [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)<[std::noop_coroutine_promise](<#/doc/coroutine/noop_coroutine_promise>)>.

As funções membro estáticas from_promise e from_address também podem criar um `coroutine_handle`.

### Ver também

[ from_promise](<#/doc/coroutine/coroutine_handle/from_promise>)[static] | cria um `coroutine_handle` a partir do objeto promise de uma corrotina
(função membro estática pública)
[ from_address](<#/doc/coroutine/coroutine_handle/from_address>)[static] | importa uma corrotina de um ponteiro
(função membro estática pública)
[ noop_coroutine](<#/doc/coroutine/noop_coroutine>)(C++20) | cria um coroutine handle que não tem efeitos observáveis quando retomado ou destruído
(função)