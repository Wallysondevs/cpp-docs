# std::collate&lt;CharT&gt;::transform, do_transform

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
string_type transform( const CharT* low, const CharT* high ) const;
protected:
virtual string_type do_transform( const CharT* low, const CharT* high ) const;
```

1) Função membro pública, chama a função membro virtual protegida `do_transform` da classe mais derivada.

2) Converte a sequência de caracteres `[`low`, `high`)` para uma string que, comparada lexicograficamente (por exemplo, com `operator<` para strings) com o resultado da chamada de `transform()` em outra string, produz o mesmo resultado que a chamada de [do_compare()](<#/doc/locale/collate/compare>) nas mesmas duas strings.

### Parâmetros

- **low** — ponteiro para o primeiro caractere na sequência a ser transformada
- **high** — ponteiro para um elemento após o final da sequência a ser transformada

### Valor de retorno

A string transformada de modo que a comparação lexicográfica das strings transformadas possa ser usada em vez da ordenação (collation) das originais. No locale "C", a string retornada é a cópia exata de `[`low`, `high`)`. Em outros locales, o conteúdo da string retornada é definido pela implementação, e o tamanho pode ser consideravelmente maior.

### Observações

Além do uso na ordenação (collation), o formato específico da implementação da string transformada é conhecido por [std::regex_traits<>::transform_primary](<#/doc/regex/regex_traits/transform_primary>), que é capaz de extrair as informações da classe de equivalência.

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <locale>
    
    int main()
    {
        std::locale::global(std::locale("sv_SE.utf8"));
        auto& f = std::use_facet<std::collate<wchar_t>>(std::locale());
    
        std::wstring in1 = L"\u00e4ngel";
        std::wstring in2 = L"\u00e5r";
    
        std::wstring out1 = f.transform(&in1[0], &in1[0] + in1.size());
        std::wstring out2 = f.transform(&in2[0], &in2[0] + in2.size());
    
        std::wcout << "In the Swedish locale: ";
        if (out1 < out2)
            std::wcout << in1 << " before " << in2 << '\n';
        else
            std::wcout << in2 << " before " << in1 << '\n';
    
        std::wcout << "In lexicographic comparison: ";
        if (in1 < in2)
            std::wcout << in1 << " before " << in2 << '\n';
        else
            std::wcout << in2 << " before " << in1 << '\n';
    }
```

Saída:
```
    In the Swedish locale: år before ängel
    In lexicographic comparison: ängel before år
```

### Veja também

[ strxfrm](<#/doc/string/byte/strxfrm>) | transforma uma string para que `strcmp` produza o mesmo resultado que `strcoll`
(função)
[ wcsxfrm](<#/doc/string/wide/wcsxfrm>) | transforma uma wide string para que `wcscmp` produza o mesmo resultado que `wcscoll`
(função)