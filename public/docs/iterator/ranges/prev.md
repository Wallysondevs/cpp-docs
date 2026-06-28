# std::ranges::prev

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
Assinatura da chamada
template< std::bidirectional_iterator I >
constexpr I prev( I i );
template< std::bidirectional_iterator I >
constexpr I prev( I i, std::iter_difference_t<I> n );
template< std::bidirectional_iterator I >
constexpr I prev( I i, std::iter_difference_t<I> n, I bound );
```

Retorna o n-ésimo predecessor do iterator i.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

* Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
* Nenhum deles é visível para [pesquisa dependente de argumento](<#/doc/language/adl>).
* Quando qualquer um deles é encontrado por [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida.

### Parâmetros

- **i** — um iterator
- **n** — número de elementos que i deve ser decrementado
- **bound** — iterator denotando o início do range para o qual i aponta

### Valor de retorno

1) O predecessor de i.

2) O n-ésimo predecessor do iterator i.

3) O n-ésimo predecessor do iterator i, ou o primeiro iterator que se compara igual a bound, o que ocorrer primeiro.

### Complexidade

1) Constante.

2,3) Constante se `I` modela [std::random_access_iterator](<#/doc/iterator/random_access_iterator>)&lt;I&gt;; caso contrário, linear.

### Possível implementação
```cpp
    struct prev_fn
    {
        template<std::bidirectional_iterator I>
        constexpr I operator()(I i) const
        {
            --i;
            return i;
        }
    
        template<std::bidirectional_iterator I>
        constexpr I operator()(I i, std::iter_difference_t<I> n) const
        {
            ranges::advance(i, -n);
            return i;
        }
    
        template<std::bidirectional_iterator I>
        constexpr I operator()(I i, std::iter_difference_t<I> n, I bound) const
        {
            ranges::advance(i, -n, bound);
            return i;
        }
    };
    
    inline constexpr auto prev = prev_fn();
```

---

### Notas

Embora a expressão `--r.end()` frequentemente compile para containers, não há garantia de que o faça: `r.end()` é uma expressão rvalue, e não há requisito de iterator que especifique que o decremento de um rvalue tenha garantia de funcionar. Em particular, quando iterators são implementados como ponteiros ou seu `operator--` é qualificado como lvalue-ref, `--r.end()` não compila, enquanto `ranges::prev(r.end())` compila.

Isso é ainda mais exacerbado por ranges que não modelam [ranges::common_range](<#/doc/ranges/common_range>). Por exemplo, para alguns ranges subjacentes, `ranges::transform_view::end` não tem o mesmo tipo de retorno que `ranges::transform_view::begin`, e assim `--r.end()` não compilará. Isso não é algo que `ranges::prev` possa ajudar, mas existem soluções alternativas.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <vector>
    
    int main() 
    {
        std::vector<int> v{3, 1, 4};
        auto pv = std::ranges::prev(v.end(), 2);
        std::cout << *pv << '\n';
    
        pv = std::ranges::prev(pv, 42, v.begin());
        std::cout << *pv << '\n';
    }
```

Saída:
```
    1
    3
```

### Veja também

[ ranges::next](<#/doc/iterator/ranges/next>)(C++20) | incrementa um iterator por uma dada distância ou até um limite
(objeto de função de algoritmo)
[ ranges::advance](<#/doc/iterator/ranges/advance>)(C++20) | avança um iterator por uma dada distância ou até um dado limite
(objeto de função de algoritmo)
[ prev](<#/doc/iterator/prev>)(C++11) | decrementa um iterator
(modelo de função)