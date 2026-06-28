# std::weak_ptr&lt;T&gt;::operator=

```cpp
weak_ptr& operator=( const weak_ptr& r ) noexcept;  // (1) (desde C++11)
template< class Y >
weak_ptr& operator=( const weak_ptr<Y>& r ) noexcept;  // (2) (desde C++11)
template< class Y >
weak_ptr& operator=( const shared_ptr<Y>& r ) noexcept;  // (3) (desde C++11)
weak_ptr& operator=( weak_ptr&& r ) noexcept;  // (4) (desde C++11)
template< class Y >
weak_ptr& operator=( weak_ptr<Y>&& r ) noexcept;  // (5) (desde C++11)
```

Substitui o objeto gerenciado pelo objeto gerenciado por r. O objeto é compartilhado com r. Se r não gerencia nenhum objeto, *this também não gerencia nenhum objeto.

1-3) Equivalente a [std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;T&gt;(r).swap(*this).

4,5) Equivalente a [std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;T&gt;(std::move(r)).swap(*this).

### Parâmetros

- **r** — ponteiro inteligente para compartilhar um objeto com

### Valor de retorno

*this

### Notas

A implementação pode satisfazer os requisitos sem criar um objeto `weak_ptr` temporário.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2315](<https://cplusplus.github.io/LWG/issue2315>) | C++11 | move semantic não estava habilitado para `weak_ptr` | habilitado

### Veja também

[ (construtor)](<#/doc/memory/weak_ptr/weak_ptr>) | cria um novo `weak_ptr`
(função membro pública)
[ swap](<#/doc/memory/weak_ptr/swap>) | troca os objetos gerenciados
(função membro pública)