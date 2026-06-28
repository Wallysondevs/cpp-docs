# std::ios_base::getloc

[std::locale](<#/doc/locale/locale>) getloc() const;

  
Retorna o locale atual associado ao stream.

### Parâmetros

(nenhum)

### Valor de retorno

O objeto locale associado ao stream.

### Exemplo

A saída mostrada foi obtida usando o compilador clang.

Execute este código
```cpp
    #include <codecvt>
    #include <ctime>
    #include <iomanip>
    #include <iostream>
    
    int main()
    {
        std::wbuffer_convert<std::codecvt_utf8<wchar_t>> conv(std::cout.rdbuf());
        std::wostream out(&conv);
    
        out.imbue(std::locale(out.getloc(),
                              new std::time_put_by_name<wchar_t>("ja_JP.utf8")));
    
        std::time_t t = std::time(nullptr);
        out << std::put_time(std::localtime(&t), L"%A %c") << '\n';
    }
```

Saída possível:
```
    木曜日 2023年10月05日 19時47分58秒
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 47](<https://cplusplus.github.io/LWG/issue47>) | C++98  | o valor de retorno foi especificado incorretamente como o valor de retorno de `imbue()` | corrigido   
  
### Veja também

[ imbue](<#/doc/io/ios_base/imbue>) |  define o locale   
(função membro pública)  