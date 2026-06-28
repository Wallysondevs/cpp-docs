# std::equal_to, not_equal_to, less, greater, less_equal, greater_equal(std::experimental::propagate_const)

Definido no cabeçalho `[<experimental/propagate_const>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/propagate_const&action=edit&redlink=1> "cpp/header/experimental/propagate const \(page does not exist\)")`

```c
template< class T > struct equal_to<std::experimental::propagate_const<T>>;
template< class T > struct not_equal_to<std::experimental::propagate_const<T>>;
template< class T > struct less<std::experimental::propagate_const<T>>;
template< class T > struct greater<std::experimental::propagate_const<T>>;
template< class T > struct less_equal<std::experimental::propagate_const<T>>;
template< class T > struct greater_equal<std::experimental::propagate_const<T>>;
```

  
Os objetos de função de comparação padrão são parcialmente especializados para [std::experimental::propagate_const](<#/doc/experimental/propagate_const>)&lt;T&gt;.

Seja p.t_ o objeto tipo ponteiro encapsulado por um [std::experimental::propagate_const](<#/doc/experimental/propagate_const>)&lt;T&gt; p, então, dados os objetos `p` e `q` do tipo [std::experimental::propagate_const](<#/doc/experimental/propagate_const>)&lt;T&gt;, o seguinte deve ser válido:

  * [std::equal_to](<#/doc/utility/functional/equal_to>)<[std::experimental::propagate_const](<#/doc/experimental/propagate_const>)&lt;T&gt;>()(p, q) == [std::equal_to](<#/doc/utility/functional/equal_to>)&lt;T&gt;()(p.t_, q.t_)
  * [std::not_equal_to](<#/doc/utility/functional/not_equal_to>)<[std::experimental::propagate_const](<#/doc/experimental/propagate_const>)&lt;T&gt;>()(p, q) == [std::not_equal_to](<#/doc/utility/functional/not_equal_to>)&lt;T&gt;()(p.t_, q.t_)
  * [std::less](<#/doc/utility/functional/less>)<[std::experimental::propagate_const](<#/doc/experimental/propagate_const>)&lt;T&gt;>()(p, q) == [std::less](<#/doc/utility/functional/less>)&lt;T&gt;()(p.t_, q.t_)
  * [std::greater](<#/doc/utility/functional/greater>)<[std::experimental::propagate_const](<#/doc/experimental/propagate_const>)&lt;T&gt;>()(p, q) == [std::greater](<#/doc/utility/functional/greater>)&lt;T&gt;()(p.t_, q.t_)
  * [std::less_equal](<#/doc/utility/functional/less_equal>)<[std::experimental::propagate_const](<#/doc/experimental/propagate_const>)&lt;T&gt;>()(p, q) == [std::less_equal](<#/doc/utility/functional/less_equal>)&lt;T&gt;()(p.t_, q.t_)
  * [std::greater_equal](<#/doc/utility/functional/greater_equal>)<[std::experimental::propagate_const](<#/doc/experimental/propagate_const>)&lt;T&gt;>()(p, q) == [std::greater_equal](<#/doc/utility/functional/greater_equal>)&lt;T&gt;()(p.t_, q.t_)

### Notas

Essas especializações garantem que, quando `T` é um tipo de ponteiro, as especializações desses modelos de classe para [std::experimental::propagate_const](<#/doc/experimental/propagate_const>)&lt;T&gt; produzem uma ordem total, mesmo que os operadores embutidos correspondentes não o façam.

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ equal_to](<#/doc/utility/functional/equal_to>) |  objeto de função que implementa x == y   
(modelo de classe)  
[ not_equal_to](<#/doc/utility/functional/not_equal_to>) |  objeto de função que implementa x != y   
(modelo de classe)  
[ less](<#/doc/utility/functional/less>) |  objeto de função que implementa x < y   
(modelo de classe)  
[ greater](<#/doc/utility/functional/greater>) |  objeto de função que implementa x > y   
(modelo de classe)  
[ less_equal](<#/doc/utility/functional/less_equal>) |  objeto de função que implementa x <= y   
(modelo de classe)  
[ greater_equal](<#/doc/utility/functional/greater_equal>) |  objeto de função que implementa x >= y   
(modelo de classe)