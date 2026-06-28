# std::towctrans

Definido no cabeçalho `[<cwctype>](<#/doc/header/cwctype>)`

```c
std::wint_t towctrans( std::wint_t ch, std::wctrans_t desc );
```

Mapeia o caractere largo ch usando a categoria de mapeamento [LC_CTYPE](<#/doc/locale/LC_categories>) do locale C atual, identificada por desc.

Se o valor de ch não for representável como um `wchar_t` nem igual ao valor da macro `WEOF`, o comportamento é indefinido.

### Parâmetros

- **ch** — o caractere largo a ser mapeado
- **desc** — o mapeamento [LC_CTYPE](<#/doc/locale/LC_categories>), obtido de uma chamada para [std::wctrans](<#/doc/string/wide/wctrans>)

### Valor de retorno

O valor mapeado de ch usando o mapeamento identificado por desc na facet [LC_CTYPE](<#/doc/locale/LC_categories>) do locale C atual.

### Exemplo

O exemplo a seguir demonstra o mapeamento de caracteres katakana para hiragana.

Execute este código
```cpp
    #include <algorithm>
    #include <clocale>
    #include <cwctype>
    #include <iostream>
    
    std::wstring tohira(std::wstring str)
    {
        std::transform(str.begin(), str.end(), str.begin(), 
        {
             return std::towctrans(c, std::wctrans("tojhira"));
        });
        return str;
    }
    
    int main()
    {
        std::setlocale(LC_ALL, "ja_JP.UTF-8");
        std::wstring kana = L"ヒラガナ";
        std::wcout << "katakana characters " << kana
                   << " are " << tohira(kana) << " in hiragana\n";
    }
```

Saída:
```
    katakana characters ヒラガナ are ひらがな in hiragana
```

### Veja também

[ wctrans](<#/doc/string/wide/wctrans>) | procura por uma categoria de mapeamento de caracteres no locale C atual
(função)
[Documentação C](<#/>) para towctrans