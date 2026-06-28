# std::auto_ptr&lt;T&gt;::operator=

auto_ptr& operator=( auto_ptr& r ) throw(); | (1) | (deprecated in C++11)
(removed in C++17)
template< class Y >
auto_ptr& operator=( auto_ptr&lt;Y&gt;& r ) throw(); | (2) | (deprecated in C++11)
(removed in C++17)
auto_ptr& operator=( auto_ptr_ref&lt;T&gt; m ) throw(); | (3) | (deprecated in C++11)
(removed in C++17)

Substitui o objeto gerenciado pelo objeto gerenciado por r ou m.

1) Efetivamente chama reset(r.release()).

2) Efetivamente chama reset(r.release()). `Y*` deve ser implicitamente conversível para `T*`.

3) Efetivamente chama reset(m.release()). `auto_ptr_ref` é um tipo definido pela implementação que mantém uma referência para `auto_ptr`. [std::auto_ptr](<#/doc/memory/auto_ptr>) é implicitamente [conversível para](<#/doc/memory/auto_ptr/operator_auto_ptr>) e [de](<#/doc/memory/auto_ptr/auto_ptr>) este tipo. A implementação pode fornecer o template com um nome diferente ou implementar funcionalidade equivalente de outras maneiras.

### Parâmetros

- **r** — outro `auto_ptr` para transferir a propriedade do objeto de
- **m** — um objeto de tipo definido pela implementação que mantém uma referência para `auto_ptr`

### Valor de retorno

*this.

### Notas

O construtor e o operador de atribuição de cópia de `auto_ptr_ref` são fornecidos para permitir a construção por cópia e a atribuição de [std::auto_ptr](<#/doc/memory/auto_ptr>) a partir de temporários sem nome. Como seu construtor de cópia e operador de atribuição de cópia recebem o argumento como referência não-const, eles não podem vincular argumentos rvalue diretamente. No entanto, uma [conversão definida pelo usuário](<#/doc/memory/auto_ptr/operator_auto_ptr>) pode ser executada (que libera o `auto_ptr` original), seguida por uma chamada ao construtor ou operador de atribuição de cópia que recebe `auto_ptr_ref` por valor. Esta é uma implementação inicial de [move semantics](<#/doc/utility/move>).

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 127](<https://cplusplus.github.io/LWG/issue127>) | C++98 | `auto_ptr` não era atribuível a partir de `auto_ptr_ref` | sobrecarga (3) adicionada