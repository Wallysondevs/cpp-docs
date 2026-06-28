# std::ios_base::sync_with_stdio

static bool sync_with_stdio( bool sync = true );

  
Define se os streams C++ padrão são sincronizados com os streams C padrão após cada operação de entrada/saída.

Os streams C++ padrão são os seguintes: [std::cin](<#/doc/io/cin>), [std::cout](<#/doc/io/cout>), [std::cerr](<#/doc/io/cerr>), [std::clog](<#/doc/io/clog>), [std::wcin](<#/doc/io/cin>), [std::wcout](<#/doc/io/cout>), [std::wcerr](<#/doc/io/cerr>) e [std::wclog](<#/doc/io/clog>).

Os streams C padrão são os seguintes: [stdin](<#/doc/io/c/std_streams>), [stdout](<#/doc/io/c/std_streams>) e [stderr](<#/doc/io/c/std_streams>).

Para um stream padrão str, sincronizado com o stream C f, os seguintes pares de funções têm efeito idêntico:

1) [std::fputc](<#/doc/io/c/fputc>)(f, c) e str.rdbuf()->sputc(c).

2) [std::fgetc](<#/doc/io/c/fgetc>)(f) e str.rdbuf()->sbumpc().

3) [std::ungetc](<#/doc/io/c/ungetc>)(c, f) e str.rdbuf()->sputbackc(c).

Na prática, isso significa que os streams C++ sincronizados não são armazenados em buffer (unbuffered), e cada operação de E/S em um stream C++ é imediatamente aplicada ao buffer do stream C correspondente. Isso torna possível misturar livremente E/S C++ e C.

Além disso, os streams C++ sincronizados têm garantia de serem thread-safe (caracteres individuais produzidos por múltiplas threads podem se intercalar, mas nenhuma data race ocorre).

Se a sincronização for desativada, os streams padrão C++ podem armazenar em buffer sua E/S independentemente, o que pode ser consideravelmente mais rápido em alguns casos.

Por padrão, todos os oito streams C++ padrão são sincronizados com seus respectivos streams C.

Se esta função for chamada após a ocorrência de E/S no stream padrão, o comportamento é definido pela implementação: as implementações variam de nenhum efeito a destruir o buffer de leitura.

### Parâmetros

sync  |  \-  |  a nova configuração de sincronização   
  
### Valor de retorno

Estado de sincronização antes da chamada da função.

### Exemplo

Run this code
```
    #include <cstdio>
    #include <iostream>
     
    int main()
    {
        std::ios::sync_with_stdio(false);
        std::cout << "a\n";
        std::printf("b\n");
        std::cout << "c\n";
    }
```

Saída possível: 
```
    b
    a
    c
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 49](<https://cplusplus.github.io/LWG/issue49>) | C++98  | era não especificado (1) qual estado é realmente retornado e  
(2) o que significa 'sincronizado' entre streams C e C++ padrão  | ambos especificados   
  
### Ver também

[ coutwcout](<#/doc/io/cout>) |  escreve para o stream de saída C padrão [stdout](<#/doc/io/c/std_streams>)  
(objeto global)  
[ cerrwcerr](<#/doc/io/cerr>) |  escreve para o stream de erro C padrão [stderr](<#/doc/io/c/std_streams>), sem buffer  
(objeto global)  
[ clogwclog](<#/doc/io/clog>) |  escreve para o stream de erro C padrão [stderr](<#/doc/io/c/std_streams>)  
(objeto global)