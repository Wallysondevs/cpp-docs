# std::qsort

Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`

```c
void qsort( void *ptr, std::size_t count,
std::size_t size, /* c-compare-pred */* comp );
void qsort( void *ptr, std::size_t count,
std::size_t size, /* compare-pred */* comp );
extern "C" using /* c-compare-pred */ = int(const void*, const void*);
extern "C++" using /* compare-pred */ = int(const void*, const void*);
```

Ordena o array fornecido apontado por ptr em ordem crescente. O array contém count elementos de size bytes. A função apontada por comp é usada para comparação de objetos.

Se comp indicar que dois elementos são equivalentes, a ordem deles é não especificada.

Se o tipo dos elementos do array não for um tipo [PODType](<#/doc/named_req/PODType>)(até C++11)[TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>)(desde C++11), o comportamento é indefinido.

### Parâmetros

- **ptr** — ponteiro para o array a ser ordenado
- **count** — número de elementos no array
- **size** — tamanho de cada elemento no array em bytes
- **comp** — função de comparação que retorna um valor inteiro negativo se o primeiro argumento for _menor_ que o segundo, um valor inteiro positivo se o primeiro argumento for _maior_ que o segundo e zero se os argumentos forem equivalentes.
A assinatura da função de comparação deve ser equivalente à seguinte: int cmp(const void *a, const void *b); A função não deve modificar os objetos passados a ela e deve retornar resultados consistentes quando chamada para os mesmos objetos, independentemente de suas posições no array. ​

### Valor de retorno

(nenhum)

### Observações

Apesar do nome, os padrões C++, C e POSIX não exigem que esta função seja implementada usando [Quicksort](<https://en.wikipedia.org/wiki/Quicksort> "enwiki:Quicksort") ou fornecem quaisquer garantias de complexidade ou estabilidade.

As duas sobrecargas fornecidas pela standard library C++ são distintas porque os tipos do parâmetro comp são distintos (a [ligação de linguagem](<#/doc/language/language_linkage>) faz parte do seu tipo).

### Exemplo

O código a seguir ordena um array de inteiros usando `qsort()`:

Execute este código
```cpp
    #include <array>
    #include <climits>
    #include <compare>
    #include <cstdlib>
    #include <iostream>
    
    int main()
    {
        std::array a{-2, 99, 0, -743, INT_MAX, 2, INT_MIN, 4};
    
        std::qsort
        (
            a.data(),
            a.size(),
            sizeof(decltype(a)::value_type),
            
            {
                const int arg1 = *static_cast<const int*>(x);
                const int arg2 = *static_cast<const int*>(y);
                const auto cmp = arg1 <=> arg2;
                if (cmp < 0)
                    return -1;
                if (cmp > 0)
                    return 1;
                return 0;
            }
        );
    
        for (int ai : a)
            std::cout << ai << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    -2147483648 -743 -2 0 2 4 99 2147483647
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 405](<https://cplusplus.github.io/LWG/issue405>) | C++98 | os elementos do array poderiam ter qualquer tipo | limitado a [PODType](<#/doc/named_req/PODType>)

### Ver também

[ bsearch](<#/doc/algorithm/bsearch>) | busca um elemento de tipo não especificado em um array
(função)
[ sort](<#/doc/algorithm/sort>) | ordena um range em ordem crescente
(modelo de função)
[ is_trivial](<#/doc/types/is_trivial>)(C++11)(obsoleto em C++26) | verifica se um tipo é trivial
(modelo de classe)
[Documentação C](<#/>) para qsort