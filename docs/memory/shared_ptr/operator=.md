# std::shared_ptr&lt;T&gt;::operator=

```cpp
shared_ptr& operator=( const shared_ptr& r ) noexcept;  // (1)
template< class Y >
shared_ptr& operator=( const shared_ptr<Y>& r ) noexcept;  // (2)
shared_ptr& operator=( shared_ptr&& r ) noexcept;  // (3)
template< class Y >
shared_ptr& operator=( shared_ptr<Y>&& r ) noexcept;  // (4)
template< class Y >
shared_ptr& operator=( std::auto_ptr<Y>&& r ); |  (5)  |  (obsoleto desde C++11)
(removido em C++17)
template< class Y, class Deleter >
shared_ptr& operator=( std::unique_ptr<Y, Deleter>&& r );  // (6)
```

  
Substitui o objeto gerenciado pelo objeto gerenciado por r.

Se *this já possui um objeto e é o último `shared_ptr` a possuí-lo, e r não é o mesmo que *this, o objeto é destruído através do deleter possuído.

1,2) Compartilha a propriedade do objeto gerenciado por r. Se r não gerencia nenhum objeto, *this também não gerencia nenhum objeto. Equivalente a shared_ptr&lt;T&gt;(r).swap(*this).

3,4) Atribui por movimento (move-assigns) um `shared_ptr` de r. Após a atribuição, *this contém uma cópia do estado anterior de r, e r está vazio. Equivalente a shared_ptr&lt;T&gt;(std::move(r)).swap(*this).

5) Transfere a propriedade do objeto gerenciado por r para *this. Se r não gerencia nenhum objeto, *this também não gerencia nenhum objeto. Após a atribuição, *this contém o ponteiro anteriormente mantido por r, e use_count() == 1; r também está vazio. Equivalente a shared_ptr&lt;T&gt;(r).swap(*this).

6) Transfere a propriedade do objeto gerenciado por r para *this. O deleter associado a r é armazenado para futura exclusão do objeto gerenciado. r não gerencia nenhum objeto após a chamada. Equivalente a shared_ptr&lt;T&gt;(std::move(r)).swap(*this).

### Parâmetros

r  |  \-  |  outro smart pointer para compartilhar a propriedade ou adquirir a propriedade de   
  
### Valor de retorno

*this

### Observações

A implementação pode satisfazer os requisitos sem criar um objeto `shared_ptr` temporário.

### Exceções

5,6) Pode lançar exceções definidas pela implementação.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ reset](<#/doc/memory/shared_ptr/reset>) |  substitui o objeto gerenciado   
(função membro pública)  