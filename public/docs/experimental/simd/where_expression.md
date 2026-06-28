# std::experimental::where_expression

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
template< class M, class V >
class where_expression;
```

O template de classe `where_expression` abstrai a noção de elementos selecionados de um dado lvalue de tipo aritmético ou de paralelismo de dados. Elementos selecionados são os elementos do lvalue (do tipo `V`) para os quais o elemento correspondente da máscara (do tipo `M`) é verdadeiro. Operadores aplicados a objetos do tipo `where_expression<M, V>` são aplicados apenas aos elementos selecionados. Todos os outros elementos são deixados inalterados.

Use a função [`where`](<#/doc/experimental/simd/where>) para construir objetos `where_expression`.

### Parâmetros de template

- **M** — O tipo da máscara
- **V** — O tipo de valor sobre o qual M se aplica

Combinações válidas de `(`M`, `V`)` são:

*   `(`simd_mask<T, Abi>`, `simd<T, Abi>`)`,
*   `(`simd_mask<T, Abi>`, `simd_mask<T, Abi>`)`,
*   `(`bool`, `T`)`.

### Funções membro

[ operator=](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/simd/where_expression/operator%3D&action=edit&redlink=1> "cpp/experimental/simd/where expression/operator= \(page does not exist\)") | atribui a posições selecionadas
(função membro pública)
[ operator+=operator-=operator*=operator/=operator%=operator&=operator|=operator^=operator<<=operator>>=](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/simd/where_expression/compound_operators&action=edit&redlink=1> "cpp/experimental/simd/where expression/compound operators \(page does not exist\)") | operadores compostos
(função membro pública)
[ operator++operator--](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/simd/where_expression/inc&action=edit&redlink=1> "cpp/experimental/simd/where expression/inc \(page does not exist\)") | operadores de incremento e decremento
(função membro pública)
[ copy_from](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/simd/where_expression/copy_from&action=edit&redlink=1> "cpp/experimental/simd/where expression/copy from \(page does not exist\)") | carrega de um endereço para posições selecionadas
(função membro pública)

### Exemplo

Execute este código
```cpp
    #include <cstddef>
    #include <experimental/simd>
    #include <iostream>
    namespace stdx = std::experimental;
    
    void print(auto const& a)
    {
        for (std::size_t i{}; i != std::size(a); ++i)
            std::cout << a[i] << ' ';
        std::cout << '\n';
    }
    
    template<class A>
    stdx::simd<int, A> my_abs(stdx::simd<int, A> x)
    {
        where(x < 0, x) = -x;
        return x;
    }
    
    int main()
    {
        const stdx::native_simd<int> a( { return i - 2; });
        print(a);
        const auto b = my_abs(a);
        print(b);
    }
```

Saída possível:
```
    -2 -1 0 1 
    2 1 0 1
```