# std::basic_ios&lt;CharT,Traits&gt;::imbue

[std::locale](<#/doc/locale/locale>) imbue( const [std::locale](<#/doc/locale/locale>)& loc );

  
Substitui o locale atual. Efetivamente chama ios_base::imbue(loc) e, se houver um stream buffer associado (rdbuf() != 0), então chama rdbuf()->pubimbue(loc).

### Parameters

loc  |  \-  |  o novo locale   
  
### Return value

O locale anterior, conforme retornado por ios_base::imbue(loc). 

### Exceptions

Pode lançar exceções definidas pela implementação. 

### Example

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    #include <sstream>
     
    int main()
    {
        std::istringstream iss;
        iss.imbue(std::locale("en_US.UTF8"));
     
        std::cout << "Current locale: " << iss.getloc().name() << '\n';
     
        iss.imbue(std::locale());
        std::cout << "Global locale : " << iss.getloc().name() << '\n';
    }
```

Saída: 
```
    Current locale: en_US.UTF8
    Global locale : C
```