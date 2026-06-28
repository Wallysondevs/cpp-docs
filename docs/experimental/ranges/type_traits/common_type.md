# std::experimental::ranges::common_type

Definido no cabeçalho `[<experimental/ranges/type_traits>](<#/doc/header/experimental/ranges/type_traits>)`

```c
template< class... T >
struct common_type;
```

  
Determina o tipo comum entre todos os tipos `T...`, isto é, o tipo para o qual todos os `T...` podem ser implicitamente convertidos. Se tal tipo existir (conforme determinado pelas regras abaixo), o membro `type` nomeia esse tipo. Caso contrário, não há membro `type`. O comportamento é indefinido se qualquer um dos tipos em `T...` for um tipo incompleto diferente de `void` (possivelmente cv-qualificado). 

  * Se sizeof...(T) for zero, não há membro `type`. 
  * Se sizeof...(T) for um (isto é, `T...` contém apenas um tipo `T0`), o membro `type` nomeia o mesmo tipo que [std::decay_t](<#/doc/types/decay>)&lt;T0&gt;. 
  * Se sizeof...(T) for dois (isto é, `T...` contém exatamente dois tipos `T1` e `T2`), 

    

  * Se a aplicação de [std::decay](<#/doc/types/decay>) a pelo menos um de `T1` e `T2` produzir um tipo diferente, o membro `type` nomeia o mesmo tipo que ranges::common_type_t<[std::decay_t](<#/doc/types/decay>)&lt;T1&gt;, [std::decay_t](<#/doc/types/decay>)&lt;T2&gt;>, se existir; caso contrário, não há membro `type`; 
  * Caso contrário, (e a menos que haja uma especialização de usuário para ranges::common_type<T1, T2>), se [std::common_type_t](<#/doc/types/common_type>)<T1, T2> for bem-formado, então o membro `type` denota esse tipo; 
  * Caso contrário, o membro `type` denota o tipo [std::decay_t](<#/doc/types/decay>)<decltype(false ? [std::declval](<#/doc/utility/declval>)&lt;const T1&&gt;() : [std::declval](<#/doc/utility/declval>)&lt;const T2&&gt;())>, se essa expressão condicional for bem-formada; caso contrário, não há membro `type`. 

  * Se sizeof...(T) for maior que dois (isto é, `T...` consiste nos tipos `T1, T2, R...`), então se ranges::common_type_t<T1, T2> existir, o membro `type` denota ranges::common_type_t<ranges::common_type_t<T1, T2>, R...> se tal tipo existir. Em todos os outros casos, não há membro `type`. 

### Tipos de membros

Nome  |  Definição   
---|---
`type` |  o tipo comum para todos os `T...`  
  
### Tipos auxiliares

template< class... T >  
using common_type_t = typename common_type<T...>::type;

  
### Especializações

Usuários podem especializar `common_type` para os tipos `T1` e `T2` se 

  * Pelo menos um de `T1` e `T2` depender de um tipo definido pelo usuário, e 
  * [std::decay](<#/doc/types/decay>) for uma transformação de identidade para ambos `T1` e `T2`. 

Se tal especialização tiver um membro chamado `type`, ele deve ser um tipo de membro público e não ambíguo que nomeia um tipo não-referência cv-não-qualificado para o qual ambos `T1` e `T2` são explicitamente conversíveis. Além disso, ranges::common_type_t<T1, T2> e ranges::common_type_t<T2, T1> devem denotar o mesmo tipo. 

Um programa que adiciona especializações de `common_type` em violação a essas regras tem comportamento indefinido. 

### Notas

Para tipos aritméticos não sujeitos a promoção, o tipo comum pode ser visto como o tipo da expressão aritmética (possivelmente de modo misto) como T0() + T1() + ... + Tn(). 

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ common_type](<#/doc/types/common_type>)(C++11) |  determina o tipo comum de um grupo de tipos   
(modelo de classe)  
[ common_reference](<#/doc/experimental/ranges/type_traits/common_reference>) |  determina o tipo de referência comum de um conjunto de tipos   
(modelo de classe)