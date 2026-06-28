# std::experimental::ranges::swap (ranges::tagged)

friend constexpr void swap( tagged& lhs, tagged& rhs ) noexcept(noexcept(lhs.swap(rhs)))  
requires Swappable&lt;Base&gt;;

  
Troca o conteúdo de *this e rhs, como se por lhs.swap(rhs);.

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [lookup dependente de argumento](<#/doc/language/adl>) quando `tagged` é uma classe associada dos argumentos.

### Notas

Ao contrário da maioria das funções `swap` não-membro na standard library, esta `swap` é uma função amiga oculta declarada no corpo de `tagged`, não um template de função. O `tagged` na declaração da função é o injected-class-name.

### Veja também

[ swap](<#/doc/experimental/ranges/utility/tagged/swap>) | troca o conteúdo de dois objetos `tagged`   
(função membro pública)  