# Cabeçalho da biblioteca experimental &lt;experimental/ranges/concepts&gt;

Este cabeçalho faz parte da biblioteca [ranges](<#/doc/experimental/ranges>).

### Conceitos de linguagem centrais

Definido no namespace `std::experimental::ranges`
---
[ Same](<#/doc/experimental/ranges/concepts/Same>) | especifica que um tipo é o mesmo que outro tipo
(concept)
[ DerivedFrom](<#/doc/experimental/ranges/concepts/DerivedFrom>) | especifica que um tipo é derivado de outro tipo
(concept)
[ ConvertibleTo](<#/doc/experimental/ranges/concepts/ConvertibleTo>) | especifica que um tipo é implicitamente conversível para outro tipo
(concept)
[ CommonReference](<#/doc/experimental/ranges/concepts/CommonReference>) | especifica que dois tipos compartilham um tipo de referência comum
(concept)
[ Common](<#/doc/experimental/ranges/concepts/Common>) | especifica que dois tipos compartilham um tipo comum
(concept)
[ Integral](<#/doc/experimental/ranges/concepts/Integral>) | especifica que um tipo é um tipo integral
(concept)
[ SignedIntegral](<#/doc/experimental/ranges/concepts/SignedIntegral>) | especifica que um tipo é um tipo integral que é com sinal
(concept)
[ UnsignedIntegral](<#/doc/experimental/ranges/concepts/UnsignedIntegral>) | especifica que um tipo é um tipo integral que não é com sinal
(concept)
[ Assignable](<#/doc/experimental/ranges/concepts/Assignable>) | especifica que um tipo é atribuível a partir de outro tipo
(concept)
[ SwappableSwappableWith](<#/doc/experimental/ranges/concepts/Swappable>) | especifica que um tipo pode ser trocado ou que dois tipos podem ser trocados entre si
(concept)

### Conceitos de comparação

Definido no namespace `std::experimental::ranges`
---
[ Boolean](<#/doc/experimental/ranges/concepts/Boolean>) | especifica que um tipo pode ser usado em contextos Booleanos
(concept)
[ WeaklyEqualityComparableWith](<#/doc/experimental/ranges/concepts/WeaklyEqualityComparableWith>) | especifica que dois tipos podem ser comparados quanto à igualdade usando os operadores == e !=
(concept)
[ EqualityComparableEqualityComparableWith](<#/doc/experimental/ranges/concepts/EqualityComparable>) | especifica que o operador == é uma relação de equivalência
(concept)
[ StrictTotallyOrderedStrictTotallyOrderedWith](<#/doc/experimental/ranges/concepts/StrictTotallyOrdered>) | especifica que os operadores de comparação no tipo produzem uma ordem total
(concept)

### Conceitos de objeto

Definido no namespace `std::experimental::ranges`
---
[ Destructible](<#/doc/experimental/ranges/concepts/Destructible>) | especifica que um objeto do tipo pode ser destruído
(concept)
[ Constructible](<#/doc/experimental/ranges/concepts/Constructible>) | especifica que uma variável do tipo pode ser construída a partir de ou vinculada a um conjunto de tipos de argumento
(concept)
[ DefaultConstructible](<#/doc/experimental/ranges/concepts/DefaultConstructible>) | especifica que um objeto de um tipo pode ser construído por padrão
(concept)
[ MoveConstructible](<#/doc/experimental/ranges/concepts/MoveConstructible>) | especifica que um objeto de um tipo pode ser construído por movimento
(concept)
[ CopyConstructible](<#/doc/experimental/ranges/concepts/CopyConstructible>) | especifica que um objeto de um tipo pode ser construído por cópia e construído por movimento
(concept)
[ Movable](<#/doc/experimental/ranges/concepts/Movable>) | especifica que um objeto de um tipo pode ser movido e trocado
(concept)
[ Copyable](<#/doc/experimental/ranges/concepts/Copyable>) | especifica que um objeto de um tipo pode ser copiado, movido e trocado
(concept)
[ Semiregular](<#/doc/experimental/ranges/concepts/Semiregular>) | especifica que um objeto de um tipo pode ser copiado, movido, trocado e construído por padrão
(concept)
[ Regular](<#/doc/experimental/ranges/concepts/Regular>) | especifica que um tipo é regular, ou seja, é tanto [`Semiregular`](<#/doc/experimental/ranges/concepts/Semiregular>) quanto [`EqualityComparable`](<#/doc/experimental/ranges/concepts/EqualityComparable>)
(concept)

### Conceitos de chamáveis

Definido no namespace `std::experimental::ranges`
---
[ InvocableRegularInvocable](<#/doc/experimental/ranges/concepts/Invocable>) | especifica que um tipo chamável pode ser invocado com um dado conjunto de tipos de argumento
(concept)
[ Predicate](<#/doc/experimental/ranges/concepts/Predicate>) | especifica que um tipo chamável é um predicado Booleano
(concept)
[ Relation](<#/doc/experimental/ranges/concepts/Relation>) | especifica que um tipo chamável é uma relação binária
(concept)
[ StrictWeakOrder](<#/doc/experimental/ranges/concepts/StrictWeakOrder>) | especifica que uma [`Relation`](<#/doc/experimental/ranges/concepts/Relation>) impõe uma ordenação fraca estrita
(concept)

### Sinopse
```cpp
namespace std { namespace experimental { namespace ranges { inline namespace v1 {
 
template <class T, class U>
concept bool Same = /* see definition */;
 
template <class T, class U>
concept bool DerivedFrom = /* see definition */;
 
template <class T, class U>
concept bool ConvertibleTo = /* see definition */;
 
template <class T, class U>
concept bool CommonReference = /* see definition */;
 
template <class T, class U>
concept bool Common = /* see definition */;
 
template <class T>
concept bool Integral = /* see definition */;
 
template <class T>
concept bool SignedIntegral = /* see definition */;
 
template <class T>
concept bool UnsignedIntegral = /* see definition */;
 
template <class T, class U>
concept bool Assignable = /* see definition */;
 
template <class T>
concept bool Swappable = /* see definition */;
 
template <class T, class U>
concept bool SwappableWith = /* see definition */;
 
template <class T>
concept bool Destructible = /* see definition */;
 
template <class T, class... Args>
concept bool Constructible = /* see definition */;
 
template <class T>
concept bool DefaultConstructible = /* see definition */;
 
template <class T>
concept bool MoveConstructible = /* see definition */;
 
template <class T>
concept bool CopyConstructible = /* see definition */;
 
template <class B>
concept bool Boolean = /* see definition */;
 
template <class T, class U>
concept bool WeaklyEqualityComparableWith = /* see definition */;
 
template <class T>
concept bool EqualityComparable = /* see definition */;
 
template <class T, class U>
concept bool EqualityComparableWith = /* see definition */;
 
template <class T>
concept bool StrictTotallyOrdered = /* see definition */;
 
template <class T, class U>
concept bool StrictTotallyOrderedWith = /* see definition */;
 
template <class T>
concept bool Movable = /* see definition */;
 
template <class T>
concept bool Copyable = /* see definition */;
 
template <class T>
concept bool Semiregular = /* see definition */;
 
template <class T>
concept bool Regular = /* see definition */;
 
template <class F, class... Args>
concept bool Invocable = /* see definition */;
 
template <class F, class... Args>
concept bool RegularInvocable = /* see definition */;
 
template <class F, class... Args>
concept bool Predicate = /* see definition */;
 
template <class R, class T, class U>
concept bool Relation = /* see definition */;
 
template <class R, class T, class U>
concept bool StrictWeakOrder = /* see definition */;
 
}}}}
```