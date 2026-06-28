# Diretivas de diagnóstico

Exibe a mensagem de erro fornecida e torna o programa malformado, ou exibe a mensagem de aviso fornecida sem afetar a validade do programa (desde C++23).

### Sintaxe

---
`#error` diagnostic-message | (1) |
---|---|---
`#warning` diagnostic-message | (2) | (desde C++23)
---

### Explicação

1) Após encontrar a diretiva #error, uma implementação exibe a mensagem diagnostic-message e torna o programa malformado (a compilação é interrompida).

2) O mesmo que (1), exceto que a validade do programa não é afetada e a compilação continua.

diagnostic-message pode consistir em várias palavras, não necessariamente entre aspas.

### Notas

Antes de sua padronização em C++23, #warning foi fornecido por muitos compiladores em todos os modos como uma extensão conforme.

### Exemplo

Execute este código
```
    #if __STDC_HOSTED__ != 1
    #   error "Not a hosted implementation"
    #endif
    
    #if __cplusplus >= 202302L
    #   warning "Using #warning as a standard feature"
    #endif
    
    #include <iostream>
    
    int main()
    {
        std::cout << "The implementation used is hosted\n";
    }
```

Saída possível:
```
    The implementation used is hosted
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 15.8 Error directive [cpp.error]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 15.8 Error directive [cpp.error]

  * Padrão C++17 (ISO/IEC 14882:2017):

    

  * 19.5 Error directive [cpp.error]

  * Padrão C++14 (ISO/IEC 14882:2014):

    

  * 16.5 Error directive [cpp.error]

  * Padrão C++11 (ISO/IEC 14882:2011):

    

  * 16.5 Error directive [cpp.error]

  * Padrão C++03 (ISO/IEC 14882:2003):

    

  * 16.5 Error directive [cpp.error]

  * Padrão C++98 (ISO/IEC 14882:1998):

    

  * 16.5 Error directive [cpp.error]

### Veja também

[documentação C](<#/>) para diretivas de diagnóstico
---