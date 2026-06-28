# Guias de dedução para std::vector

Definido no cabeçalho `[<vector>](<#/doc/header/vector>)`

```c
template< class InputIt,
class Alloc = std::allocator<
typename std::iterator_traits<InputIt>::value_type> >
vector( InputIt, InputIt, Alloc = Alloc() )
-> vector<typename std::iterator_traits<InputIt>::value_type, Alloc>;
template< ranges::input_range R,
class Alloc = std::allocator<ranges::range_value_t<R>> >
vector( std::from_range_t, R&&, Alloc = Alloc() )
-> vector<ranges::range_value_t<R>, Alloc>;
```

1) Este [guia de dedução](<#/doc/language/ctad>) é fornecido para vector para permitir a dedução a partir de um range de iteradores. Esta sobrecarga participa da resolução de sobrecarga somente se `InputIt` satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>) e `Alloc` satisfaz [Allocator](<#/doc/named_req/Allocator>).

2) Este guia de dedução é fornecido para vector para permitir a dedução a partir de uma tag [`std::from_range_t`](<#/doc/ranges/from_range>) e um [`input_range`](<#/doc/ranges/input_range>).

Nota: a extensão em que a biblioteca determina que um tipo não satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>) é não especificada, exceto que, no mínimo, tipos integrais não se qualificam como input iterators. Da mesma forma, a extensão em que ela determina que um tipo não satisfaz [Allocator](<#/doc/named_req/Allocator>) é não especificada, exceto que, no mínimo, o tipo membro `Alloc::value_type` deve existir e a expressão [std::declval](<#/doc/utility/declval>)<Alloc&>().allocate([std::size_t](<#/doc/types/size_t>){}) deve ser bem-formada quando tratada como um operando não avaliado.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [compatíveis com ranges](<#/doc/ranges/to>); sobrecarga (2)

### Exemplo

Execute este código
```cpp
    #include <vector>
    
    int main()
    {
        std::vector<int> v = {1, 2, 3, 4};
    
        // usa guia de dedução explícita para deduzir std::vector<int>
        std::vector x(v.begin(), v.end());
    
        // deduz std::vector<std::vector<int>::iterator>
        // a primeira fase da resolução de sobrecarga para inicialização de lista seleciona o candidato
        // sintetizado a partir do construtor de lista de inicializadores; a segunda fase não é realizada
        // e o guia de dedução não tem efeito
        std::vector y{v.begin(), v.end()};
    }
```