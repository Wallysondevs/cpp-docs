# std::bsearch

Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`

```c
void* bsearch( const void* key, const void* ptr, std::size_t count,
std::size_t size, /* c-compare-pred */* comp );
void* bsearch( const void* key, const void* ptr, std::size_t count,
std::size_t size, /* compare-pred */* comp );
extern "C" using /* c-compare-pred */ = int(const void*, const void*);
extern "C++" using /* compare-pred */ = int(const void*, const void*);
```

  
Encontra um elemento igual ao elemento apontado por `key` em um array apontado por `ptr`. O array contém `count` elementos de `size` bytes cada e deve ser particionado em relação ao objeto apontado por `key`, ou seja, todos os elementos que comparam como menores devem aparecer antes de todos os elementos que comparam como iguais, e estes devem aparecer antes de todos os elementos que comparam como maiores que o objeto `key`. Um array totalmente ordenado satisfaz esses requisitos. Os elementos são comparados usando a função apontada por `comp`.

O comportamento é indefinido se o array não estiver previamente particionado em ordem crescente em relação a `key`, de acordo com o mesmo critério que `comp` utiliza.

Se o array contiver vários elementos que `comp` indicaria como iguais ao elemento procurado, então não é especificado qual elemento a função retornará como resultado.

### Parâmetros

key  |  \-  |  ponteiro para o elemento a ser procurado   
---|---|---
ptr  |  \-  |  ponteiro para o array a ser examinado   
count  |  \-  |  número de elementos no array   
size  |  \-  |  tamanho de cada elemento no array em bytes   
comp  |  \-  |  função de comparação que retorna um valor inteiro negativo se o primeiro argumento for _menor_ que o segundo, um valor inteiro positivo se o primeiro argumento for _maior_ que o segundo e zero se os argumentos forem equivalentes. `key` é passado como o primeiro argumento, um elemento do array como o segundo.  
A assinatura da função de comparação deve ser equivalente à seguinte: `int cmp(const void *a, const void *b);` A função não deve modificar os objetos passados a ela e deve retornar resultados consistentes quando chamada para os mesmos objetos, independentemente de suas posições no array. ​   
  
### Valor de retorno

Ponteiro para o elemento encontrado ou ponteiro nulo se o elemento não tiver sido encontrado.

### Notas

Apesar do nome, nem os padrões C nem POSIX exigem que esta função seja implementada usando busca binária ou fazem quaisquer garantias de complexidade.

As duas sobrecargas fornecidas pela standard library C++ são distintas porque os tipos do parâmetro `comp` são distintos ([ligação de linguagem](<#/doc/language>) faz parte do seu tipo).

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <cstdlib>
    #include <iostream>
    
    template<typename T>
    int compare(const void *a, const void *b)
    {
        const auto &arg1 = *(static_cast<const T*>(a));
        const auto &arg2 = *(static_cast<const T*>(b));
        const auto cmp = arg1 <=> arg2;
        return cmp < 0 ? -1
            :  cmp > 0 ? +1
            :  0;
    }
    
    int main()
    {
        std::array arr{1, 2, 3, 4, 5, 6, 7, 8};
    
        for (const int key : {4, 8, 9})
        {
            const int* p = static_cast<int*>(
                std::bsearch(&key,
                    arr.data(),
                    arr.size(),
                    sizeof(decltype(arr)::value_type),
                    compare<int>));
    
            std::cout << "value " << key;
            if (p)
                std::cout << " found at position " << (p - arr.data()) << '\n';
            else
                std::cout << " not found\n";
        }
    }
```

Saída:
```
    value 4 found at position 3
    value 8 found at position 7
    value 9 not found
```

### Veja também

[ qsort](<#/doc/algorithm/qsort>) |  ordena um range de elementos com tipo não especificado   
(função)  
[ equal_range](<#/doc/algorithm/equal_range>) |  retorna um range de elementos que correspondem a uma chave específica   
(modelo de função)  
[documentação C](<#/>) para bsearch