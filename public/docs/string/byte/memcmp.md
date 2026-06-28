# std::memcmp

Definido no cabeçalho `[<cstring>](<#/doc/header/cstring>)`

```c
int memcmp( const void* lhs, const void* rhs, std::size_t count );
```

Reinterpreta os objetos apontados por lhs e rhs como arrays de unsigned char e compara os primeiros count bytes desses arrays. A comparação é feita lexicograficamente.

O sinal do resultado é o sinal da diferença entre os valores do primeiro par de bytes (ambos interpretados como unsigned char) que diferem nos objetos sendo comparados.

### Parâmetros

- **lhs, rhs** — ponteiros para os buffers de memória a serem comparados
- **count** — número de bytes a serem examinados

### Valor de retorno

Valor negativo se o primeiro byte diferente (reinterpretado como unsigned char) em lhs for menor que o byte correspondente em rhs.

​0​ se todos os count bytes de lhs e rhs forem iguais.

Valor positivo se o primeiro byte diferente em lhs for maior que o byte correspondente em rhs.

### Observações

Esta função lê [representações de objeto](<#/doc/language/objects>), não os valores do objeto, e é tipicamente significativa apenas para objetos trivially-copyable que não possuem preenchimento (padding). Por exemplo, `memcmp()` entre dois objetos do tipo [std::string](<#/doc/string/basic_string>) ou [std::vector](<#/doc/container/vector>) não comparará seus conteúdos, `memcmp()` entre dois objetos do tipo struct { char c; int n; } comparará os bytes de preenchimento cujos valores podem diferir quando os valores de c e n são os mesmos, e mesmo que não houvesse bytes de preenchimento, o `int` seria comparado sem levar em conta a endianness.

### Exemplo

Execute este código
```cpp
    #include <cstring>
    #include <iostream>
    
    void demo(const char* lhs, const char* rhs, std::size_t sz)
    {
        std::cout << std::string(lhs, sz);
        const int rc = std::memcmp(lhs, rhs, sz);
        if (rc < 0)
            std::cout << " precedes ";
        else if (rc > 0)
            std::cout << " follows ";
        else
            std::cout << " compares equal to ";
        std::cout << std::string(rhs, sz) << " in lexicographical order\n";
    }
    
    int main()
    {
        char a1[] = {'a', 'b', 'c'};
        char a2[sizeof a1] = {'a', 'b', 'd'};
    
        demo(a1, a2, sizeof a1);
        demo(a2, a1, sizeof a1);
        demo(a1, a1, sizeof a1);
    }
```

Saída:
```
    abc precedes abd in lexicographical order
    abd follows abc in lexicographical order
    abc compares equal to abc in lexicographical order
```

### Veja também

[ strcmp](<#/doc/string/byte/strcmp>) | compara duas strings
(função)
[ strncmp](<#/doc/string/byte/strncmp>) | compara um certo número de caracteres de duas strings
(função)
[documentação C](<#/>) para memcmp