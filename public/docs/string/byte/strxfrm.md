# std::strxfrm

Definido no cabeçalho `[<cstring>](<#/doc/header/cstring>)`

```c
std::size_t strxfrm( char* dest, const char* src, std::size_t count );
```

Transforma a string de bytes terminada em nulo apontada por src em um formato definido pela implementação, de modo que a comparação de duas strings transformadas com [std::strcmp](<#/doc/string/byte/strcmp>) produza o mesmo resultado que a comparação das strings originais com [std::strcoll](<#/doc/string/byte/strcoll>), na locale C atual.

Os primeiros count caracteres da string transformada são escritos no destino, incluindo o caractere nulo terminador, e o comprimento da string transformada completa é retornado, excluindo o caractere nulo terminador.

O comportamento é indefinido se o array dest não for grande o suficiente. O comportamento é indefinido se dest e src se sobrepuserem.

Se count for ​0​, então dest pode ser um ponteiro nulo.

### Notas

O comprimento correto do buffer que pode receber a string transformada inteira é 1 + std::strxfrm(nullptr, src, 0).

Esta função é usada ao fazer múltiplas comparações dependentes de locale usando a mesma string ou conjunto de strings, porque é mais eficiente usar **std::strxfrm** para transformar todas as strings apenas uma vez e, subsequentemente, comparar as strings transformadas com [std::strcmp](<#/doc/string/byte/strcmp>).

### Parâmetros

- **dest** — ponteiro para o primeiro elemento do array onde a string transformada será escrita
- **src** — ponteiro para o primeiro caractere de uma string de bytes terminada em nulo a ser transformada
- **count** — número máximo de caracteres a serem escritos

### Valor de retorno

O comprimento da string transformada, não incluindo o caractere nulo terminador.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <cstring>
    #include <iomanip>
    #include <iostream>
    #include <string>
    
    int main()
    {
        char* loc = std::setlocale(LC_COLLATE, "cs_CZ.iso88592");
        assert(loc);
    
        std::string in1 = "hrnec";
        std::string out1(1 + std::strxfrm(nullptr, in1.c_str(), 0), ' ');
        std::string in2 = "chrt";
        std::string out2(1 + std::strxfrm(nullptr, in2.c_str(), 0), ' ');
    
        std::strxfrm(&out1[0], in1.c_str(), out1.size());
        std::strxfrm(&out2[0], in2.c_str(), out2.size());
    
        std::cout << "In the Czech locale: ";
        if (out1 < out2)
            std::cout << in1 << " before " << in2 << '\n';
        else
            std::cout << in2 << " before " << in1 << '\n';
    
        std::cout << "In lexicographical comparison: ";
        if (in1 < in2)
            std::cout << in1 << " before " << in2 << '\n';
        else
            std::cout << in2 << " before " << in1 << '\n';
    }
```

Saída possível:
```
    In the Czech locale: hrnec before chrt
    In lexicographical comparison: chrt before hrnec
```

### Veja também

[ wcsxfrm](<#/doc/string/wide/wcsxfrm>) | transforma uma wide string para que `wcscmp` produza o mesmo resultado que `wcscoll`
(função)
[ do_transform](<#/doc/locale/collate/transform>)[virtual] | transforma uma string para que a ordenação (collation) possa ser substituída por comparação
(função membro virtual protegida de `std::collate<CharT>`)
[ strcoll](<#/doc/string/byte/strcoll>) | compara duas strings de acordo com a locale atual
(função)
[Documentação C](<#/>) para strxfrm