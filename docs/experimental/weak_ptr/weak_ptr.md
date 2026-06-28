# std::experimental::weak_ptr&lt;T&gt;::weak_ptr

constexpr weak_ptr() noexcept; | (1) | (library fundamentals TS)
---|---|---
weak_ptr( const weak_ptr& r ) noexcept; | (2) | (library fundamentals TS)
template< class Y >
weak_ptr( const weak_ptr&lt;Y&gt;& r ) noexcept; | (2) | (library fundamentals TS)
template< class Y >
weak_ptr( const [std::experimental::shared_ptr](<#/doc/experimental/shared_ptr>)&lt;Y&gt;& r ) noexcept; | (2) | (library fundamentals TS)
---|---|---
weak_ptr( weak_ptr&& r ) noexcept; | (3) | (library fundamentals TS)
template< class Y >
weak_ptr( weak_ptr&lt;Y&gt;&& r ) noexcept; | (3) | (library fundamentals TS)

Constrói um novo `weak_ptr` que potencialmente compartilha um objeto com r.

1) Construtor padrão. Constrói um `weak_ptr` vazio.

2) Constrói um novo `weak_ptr` que compartilha um objeto gerenciado por r. Se r não gerencia nenhum objeto, *this também não gerencia nenhum objeto. As sobrecargas de template não participam da resolução de sobrecarga a menos que `Y*` seja implicitamente conversível para `T*`, ou `Y` seja do tipo "array de `N` `U`" para algum tipo `U` e algum número `N`, e `T` seja do tipo "array de limite desconhecido de `U` (possivelmente cv-qualificado)".

3) Construtores de movimento. Move uma instância de `weak_ptr` de r para *this. Depois disso, r fica vazio e r.use_count() == 0. A sobrecarga de template não participa da resolução de sobrecarga a menos que `Y*` seja implicitamente conversível para `T*`, ou `Y` seja do tipo "array de `N` `U`" para algum tipo `U` e algum número `N`, e `T` seja do tipo "array de limite desconhecido de `U` (possivelmente cv-qualificado)".

### Parâmetros

- **r** — um std::experimental::shared_ptr ou std::experimental::weak_ptr que será visualizado por este std::experimental::weak_ptr

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ (construtor)](<#/doc/memory/weak_ptr/weak_ptr>) | cria um novo `weak_ptr`
(função membro pública de `std::weak_ptr<T>`)
[ operator=](<#/>) | atribui o `weak_ptr`
(função membro pública de `std::weak_ptr<T>`)