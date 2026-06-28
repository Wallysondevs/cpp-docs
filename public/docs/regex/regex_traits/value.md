# std::regex_traits&lt;CharT&gt;::value

int value( CharT ch, int radix ) const; |  |  (desde C++11)  

  
Determina o valor representado pelo dígito `ch` na base numérica `radix`, dada a locale atualmente imbuída. Esta função é chamada por [std::regex](<#/doc/regex/basic_regex>) ao processar [Quantificadores](<#/doc/regex/ecmascript>) como `{1}` ou `{2,5}`, [Backreferences](<#/doc/regex/ecmascript>) (Retroreferências) como `\1`, e escapes de caracteres hexadecimais e Unicode. 

### Parâmetros

ch  |  \-  |  o caractere que pode representar um dígito   
---|---|---
radix  |  \-  |  8, 10 ou 16   
  
### Valor de retorno

O valor numérico se `ch` de fato representa um dígito na locale atualmente imbuída que é válido para a base numérica `radix`, ou -1 em caso de erro. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <locale>
    #include <map>
    #include <regex>
     
    // This custom regex traits allows japanese numerals
    struct jnum_traits : std::regex_traits<wchar_t>
    {   
        static std::map<wchar_t, int> data;
        int value(wchar_t ch, int radix) const
        {
            wchar_t up = std::toupper(ch, getloc());
            return data.count(up) ? data[up] : regex_traits::value(ch, radix);
        }
    };
    std::map<wchar_t, int> jnum_traits::data = {{L'〇',0}, {L'一',1}, {L'二',2},
                                                {L'三',3}, {L'四',4}, {L'五',5},
                                                {L'六',6}, {L'七',7}, {L'八',8},
                                                {L'九',9}, {L'Ａ',10}, {L'Ｂ',11},
                                                {L'Ｃ',12}, {L'Ｄ',13}, {L'Ｅ',14},
                                                {L'Ｆ',15}};
     
    int main()
    {   
        std::locale::global(std::locale("ja_JP.utf8"));
        std::wcout.sync_with_stdio(false);
        std::wcout.imbue(std::locale());
     
        std::wstring in = L"風";
     
        if (std::regex_match(in, std::wregex(L"\\u98a8")))
            std::wcout << "\\u98a8 matched " << in << '\n';
     
        if (std::regex_match(in, std::basic_regex<wchar_t, jnum_traits>(L"\\u九八ａ八")))
            std::wcout << L"\\u九八ａ八 with custom traits matched " << in << '\n';
    }
```

Saída: 
```
    \u98a8 matched 風
    \u九八ａ八 with custom traits matched 風
```