# std::auto_ptr&lt;T&gt;::auto_ptr

explicit auto_ptr( X* p = 0 ) throw(); | (1) | (obsoleto desde C++11)
(removido em C++17)
auto_ptr( auto_ptr& r ) throw(); | (2) | (obsoleto desde C++11)
(removido em C++17)
template< class Y >
auto_ptr( auto_ptr&lt;Y&gt;& r ) throw(); | (3) | (obsoleto desde C++11)
(removido em C++17)
auto_ptr( auto_ptr_ref&lt;X&gt; m ) throw(); | (4) | (obsoleto desde C++11)
(removido em C++17)

Constrói o `auto_ptr` a partir de um ponteiro que se refere ao objeto a ser gerenciado.

1) Constrói o `auto_ptr` com o ponteiro p.

2) Constrói o `auto_ptr` com o ponteiro contido em r. r.release() é chamado para adquirir a posse do objeto.

3) O mesmo que (2). Y* deve ser implicitamente conversível para T*.

4) Constrói o `auto_ptr` com o ponteiro contido na instância de `auto_ptr` referenciada por m. p.release() é chamado para o `auto_ptr p` que m contém para adquirir a posse do objeto.

`auto_ptr_ref` é um tipo definido pela implementação que mantém uma referência para `auto_ptr`. [std::auto_ptr](<#/doc/memory/auto_ptr>) é implicitamente [conversível para](<#/doc/memory/auto_ptr/operator_auto_ptr>) e [atribuível a partir de](<#/>) este tipo. A implementação pode fornecer o template com um nome diferente ou implementar funcionalidade equivalente de outras maneiras.

### Parâmetros

- **p** — um ponteiro para um objeto a ser gerenciado
- **r** — outro `auto_ptr` para transferir a posse do objeto
- **m** — um tipo definido pela implementação que mantém uma referência para `auto_ptr`

### Notas

O construtor e o operador de atribuição de cópia de `auto_ptr_ref` são fornecidos para permitir a construção por cópia e a atribuição de [std::auto_ptr](<#/doc/memory/auto_ptr>) a partir de temporários sem nome. Como seu construtor de cópia e operador de atribuição de cópia recebem o argumento como referência não-const, eles não podem vincular argumentos rvalue diretamente. No entanto, uma [conversão definida pelo usuário](<#/doc/memory/auto_ptr/operator_auto_ptr>) pode ser executada (que libera o `auto_ptr` original), seguida por uma chamada ao construtor ou operador de atribuição de cópia que recebe `auto_ptr_ref` por valor. Esta é uma implementação inicial de [move semantics](<#/doc/utility/move>).