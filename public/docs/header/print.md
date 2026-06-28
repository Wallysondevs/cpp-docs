# Cabeçalho da biblioteca padrão &lt;print&gt; (C++23)

Este cabeçalho faz parte da biblioteca de [Entrada/Saída](<#/doc/io>).

### Funções

---
[ print](<#/doc/io/print>)(C++23) | imprime para [stdout](<#/doc/io/c/std_streams>) ou um stream de arquivo usando representação [formatada](<#/doc/utility/format>) dos argumentos
(modelo de função)
[ println](<#/doc/io/println>)(C++23) | o mesmo que std::print, exceto que cada impressão é terminada por uma nova linha adicional
(modelo de função)
[ vprint_unicodevprint_unicode_buffered](<#/doc/io/vprint_unicode>)(C++23) | imprime para [stdout](<#/doc/io/c/std_streams>) com capacidade Unicode ou um stream de arquivo usando representação de argumento com [type-erased](<#/doc/utility/format/basic_format_args>)
(função)
[ vprint_nonunicodevprint_nonunicode_buffered](<#/doc/io/vprint_nonunicode>)(C++23) | imprime para [stdout](<#/doc/io/c/std_streams>) ou um stream de arquivo usando representação de argumento com [type-erased](<#/doc/utility/format/basic_format_args>)
(função)

### Sinopse
```cpp
    namespace std {
      // print functions
      template<class... Args>
        void print(format_string<Args...> fmt, Args&&... args);
      template<class... Args>
        void print(FILE* stream, format_string<Args...> fmt, Args&&... args);
    
      template<class... Args>
        void println(format_string<Args...> fmt, Args&&... args);
      void println();
      template<class... Args>
        void println(FILE* stream, format_string<Args...> fmt, Args&&... args);
      void println(FILE* stream);
    
      void vprint_unicode(string_view fmt, format_args args);
      void vprint_unicode(FILE* stream, string_view fmt, format_args args);
    
      void vprint_unicode_locking(FILE* stream, string_view fmt, format_args args);
    
      void vprint_nonunicode(string_view fmt, format_args args);
      void vprint_nonunicode(FILE* stream, string_view fmt, format_args args);
    
      void vprint_nonunicode_locking(FILE* stream, string_view fmt, format_args args);
    }
```

### Referências

* Padrão C++23 (ISO/IEC 14882:2024):

* 31.7.4 Cabeçalho `<print>` sinopse [print.syn]

* 31.7.10 Funções de impressão [print.fun]
