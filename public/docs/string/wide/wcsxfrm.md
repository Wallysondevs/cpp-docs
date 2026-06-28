# std::wcsxfrm

Definido no header `[<cwchar>](<#/doc/header/cwchar>)`

```cpp
std::size_t wcsxfrm( wchar_t* dest, const wchar_t* src, std::size_t count );
```

Transforma a wide string terminada em nulo apontada por `src` para uma forma definida pela implementação, de modo que a comparação de duas strings transformadas com [std::wcscmp](<#/doc/string/wide/wcscmp>) produza o mesmo resultado que a comparação das strings originais com [std::wcscoll](<#/doc/string/wide/wcscoll>), na locale C atual.

Os primeiros `count` caracteres da string transformada são escritos no destino, incluindo o caractere nulo terminador, e o comprimento da string transformada completa é retornado, excluindo o caractere nulo terminador.

Se `count` for ​0​, então `dest` pode ser um ponteiro nulo.

### Notas

O comprimento correto do buffer que pode receber a string transformada inteira é `1 + std::wcsxfrm(nullptr, src, 0)`.

Esta função é usada ao fazer múltiplas comparações dependentes de locale usando a mesma wide string ou conjunto de wide strings, porque é mais eficiente usar `std::wcsxfrm` para transformar todas as strings apenas uma vez, e subsequentemente comparar as wide strings transformadas com [std::wcscmp](<#/doc/string/wide/wcscmp>).

### Parâmetros

- **dest** — ponteiro para o primeiro elemento de uma wide string terminada em nulo onde a string transformada será escrita
- **src** — ponteiro para a wide string de caracteres terminada em nulo a ser transformada
- **count** — número máximo de caracteres a serem produzidos

### Valor de retorno

O comprimento da wide string transformada, não incluindo o caractere nulo terminador.

### Exemplo

Execute este código
```cpp
    #include <cwchar>
    #include <iostream>
    
    int main()
    {
        std::setlocale(LC_ALL, "sv_SE.utf8");
    
        std::wstring in1 = L"\u00e5r";
        std::wstring out1(1 + std::wcsxfrm(nullptr, in1.c_str(), 0), L' ');
        std::wstring in2 = L"\u00e4ngel";
        std::wstring out2(1 + std::wcsxfrm(nullptr, in2.c_str(), 0), L' ');
    
        std::wcsxfrm(&out1[0], in1.c_str(), out1.size());
        std::wcsxfrm(&out2[0], in2.c_str(), out2.size());
    
        std::wcout << "In the Swedish locale: ";
        if (out1 < out2)
            std::wcout << in1 << " before " << in2 << '\n';
        else
            std::wcout << in2 << " before " << in1 << '\n';
    
        std::wcout << "In lexicographical comparison: ";
        if (in1 < in2)
            std::wcout << in1 << " before " << in2 << '\n';
        else
            std::wcout << in2 << " before " << in1 << '\n';
    
    }
```

Saída:
```
    In the Swedish locale: år before ängel
    In lexicographical comparison: ängel before år
```

### Veja também

[ strxfrm](<#/doc/string/byte/strxfrm>) | transforma uma string para que `strcmp` produza o mesmo resultado que `strcoll`
(função)
[ do_transform](<#/doc/locale/collate/transform>)[virtual] | transforma uma string para que a colação possa ser substituída por comparação
(função membro virtual protegida de `std::collate<CharT>`)
[ wcscoll](<#/doc/string/wide/wcscoll>) | compara duas wide strings de acordo com a locale atual
(função)
[Documentação C](<#/>) para wcsxfrm