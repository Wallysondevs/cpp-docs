# std::experimental::optional&lt;T&gt;::~optional

~optional(); |  |  (library fundamentals TS)  

  
Se o objeto contém um valor e o tipo `T` não é trivialmente destrutível (veja [std::is_trivially_destructible](<#/doc/types/is_destructible>)), destrói o valor contido chamando seu destrutor, como se fosse por val->T::~T().

Caso contrário, não faz nada.

### Notas

Se `T` é trivialmente destrutível, então este destrutor também é trivial, então `optional<T>` também é trivialmente destrutível.